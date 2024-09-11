const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const OtpVerificationSchema = require('../models/Otp');
const OtpVerification = require('../models/Otp');

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

// Signup function
const signup = async (req, res) => {
  const { voterId, name, email, pinCode, password } = req.body;

  try {
    // Validate input
    if (!email || !name || !voterId || !pinCode || !password) {
      return res.status(400).json({ success: "failed", msg: "Please enter all the fields" });
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
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
    });

    await user.save();

    // Send OTP via email
    await sendOtpVerificationEmail(user, res);

  } catch (err) {
    // Catch any errors and respond with status 500
    return res.status(500).json({ success: "failed", msg: err.message });
  }
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

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({ success: "failed", msg: "Account is not verified. Please verify your account first." });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: "failed", msg: "Invalid credentials" });
    }

    // Store user session
    // req.session.userId = user._id; // Assuming you're using express-session for managing sessions

    // Respond with success
    return res.json({ success: "success", msg: "Logged in successfully" });

  } catch (err) {
    // Catch any errors and respond with status 500
    return res.status(500).json({ success: "failed", msg: err.message });
  }
};

const logout = (req, res) => {
  try {
    // If using JWT, you can ask the client to delete the token from the client side.
    // Alternatively, you can implement token blacklisting or expiration mechanisms here.

    // If using sessions, you'd destroy the session like this:
    // req.session.destroy(err => {
    //   if (err) {
    //     return res.status(500).json({ success: "failed", msg: "Logout failed" });
    //   }
    //   res.clearCookie('sessionId'); // Example if using cookies
    //   return res.json({ success: "success", msg: "Logged out successfully" });
    // });

    // Simple response if using JWT
    return res.json({ success: "success", msg: "Logged out successfully" });

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


module.exports = { signup, verifyOtp, login, logout , resendOtp};

