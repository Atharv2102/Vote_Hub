const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const OtpVerificationSchema = require('../models/Otp');
const OtpVerification = require('../models/Otp');
const multer = require('multer');
const path = require('path');

dotenv.config();

// Create Nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
    console.log(success);
  }
});


//uploading image

const storage = multer.diskStorage({
  destination: './uploads/', // Save files to 'uploads' folder
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set file size limit (10MB)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Images only (jpeg, jpg, png)!'));
    }
  }
}).single('photo'); // Expect a single file upload under the field 'photo'




// Signup function
const signup = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: "failed", msg: err.message });
    }

    const { voterId, name, email, pinCode, password } = req.body;

    try {
      // Validate input
      if (!email || !name || !voterId || !pinCode || !password || !req.file) {
        return res.status(400).json({ success: "failed", msg: "Please enter all the fields and upload a photo" });
      }

      // Check if user exists
      const userAlreadyExists = await User.findOne({ email, voterId });
      if (userAlreadyExists) {
        return res.status(400).json({ success: "failed", msg: "User already exists" });
      }

      // Hash the password
      const hashedPass = await bcrypt.hash(password, 10);
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

      // Create user in DB
      const user = new User({
        voterId,
        name,
        email,
        pinCode,
        password: hashedPass,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        photo: req.file.path // Store the uploaded file path
      });

      await user.save();

      // Send OTP via email
      await sendOtpVerificationEmail(user, res);
    } catch (err) {
      return res.status(500).json({ success: "failed", msg: err.message });
    }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Validate input
      if (!email || !password) {
          return res.status(400).json({ success: "failed", msg: "Please provide email and password" });
      }

      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: "failed", msg: "Invalid credentials" });
      }

      // Check if the user is verified
      if (!user.isVerified) {
          return res.status(400).json({ success: "failed", msg: "Account is not verified. Please verify your account first." });
      }

      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: "failed", msg: "Invalid credentials" });
      }

      console.log("Old session ID: " + req.session.id);

      // Regenerate session to prevent session fixation attacks
      req.session.regenerate((err) => {
          if (err) {
              return res.status(500).json({ success: "failed", msg: "Could not regenerate session" });
          }

          // Store user info and authenticated state in session
          req.session.userId = user._id;  // Storing user ID in session
          req.session.isAuthenticated = true;  // Store authenticated state

          // Optionally set a new expiration time (30 minutes)
          req.session.cookie.maxAge = 1000;

          console.log("New session ID: " + req.session.id);
          console.log("Session: ", req.session);
          console.log("Session expires in: " + req.session.cookie.maxAge / 1000 + " seconds");

          // Save the session to make sure the session is persisted
          req.session.save((saveErr) => {
              if (saveErr) {
                  return res.status(500).json({ success: "failed", msg: "Could not save session" });
              }

              // Respond with success after session is saved
              console.log("Session saved after login:", req.session);
              return res.json({
                  success: "success",
                  msg: "Logged in successfully",
                  user: {
                      id: user._id,
                      email: user.email,
                      pinCode: user.pinCode,
                  },
              });
          });
      });

  } catch (err) {
      // Catch any errors and respond with status 500
      return res.status(500).json({ success: "failed", msg: err.message });
  }
};



const logout = (req, res) => {
  try {
      // Check if user is authenticated
      if (!req.session.isAuthenticated) {
          return res.status(400).json({ success: "failed", msg: "User is not logged in" });
      }

      // Store the user ID for reference if needed
      const userId = req.session.userId;

      // Destroy the session
      req.session.destroy(err => {
          if (err) {
              return res.status(500).json({ success: "failed", msg: "Logout failed" });
          }
          
          // Clear the session cookie if you're using cookies to manage sessions
          res.clearCookie('connect.sid'); // Ensure this matches your session cookie name
          
          // Optionally, you can log the user ID for audit purposes
          console.log(`User logged out: ${userId}`);

          return res.json({ success: "success", msg: "Logged out successfully" });
      });
  } catch (err) {
      return res.status(500).json({ success: "failed", msg: err.message });
  }
};



// Verify OTP function
const verifyOtp = async (req, res) => {
  try {
    let { userId, otp } = req.body;

    // Validate input
    if (!userId || !otp) {
      throw new Error("Empty OTP details are not allowed");
    }

    // Find OTP records for the user
    const userOtpVerificationRecords = await OtpVerification.find({ userId });

    // Check if OTP records exist
    if (userOtpVerificationRecords.length <= 0) {
      throw new Error("Account record doesn't exist or has already been verified. Please Login or Signup.");
    }

    // Get OTP data
    const { expiresAt, otp: hashedOTP } = userOtpVerificationRecords[0];

    // Check if OTP has expired
    if (Date.now() > expiresAt) {
      await OtpVerification.deleteMany({ userId });
      throw new Error("Code has expired. Please request again.");
    }

    // Verify the OTP
    const validOtp = await bcrypt.compare(otp, hashedOTP);
    if (!validOtp) {
      throw new Error("Invalid OTP");
    }

    // Mark the user as verified
    await User.updateOne({ _id: userId }, { isVerified: true });

    // Delete OTP records after verification
    await OtpVerification.deleteMany({ userId });

    // Respond with success
    res.json({
      status: "Verified",
      message: "Account verified successfully",
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({ success: "failed", msg: err.message });
  }
};


// Function to send OTP verification email
const sendOtpVerificationEmail = async (user, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "OTP Verification",
      html: `<p>Enter the OTP <b>${otp}</b></p>`
    };

    const saltRounds = 10;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);

    const newOtpVerification = new OtpVerificationSchema({
      userId: user._id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
    });

    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);

    res.json({
      status: "Pending",
      message: "Verification OTP sent",
      data: {
        userId: user._id,
        email: user.email,
      }
    });
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message
    });
  }
};



const resendOtp = async (req, res) => {
  try {
    let { userId, email } = req.body;

    if (!userId || !email) {
      throw new Error("Empty details are not allowed");
    } else {
      await OtpVerification.deleteMany({ userId });
      sendOtpVerificationEmail({ _id: userId, email }, res);
    }
  } catch (err) {
    res.json({
      status: "Failed",
      message: err.message
    });
  }
}; // <-- Closing the function properly




module.exports = { signup, verifyOtp, login, logout , resendOtp,upload};

