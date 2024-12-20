const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Import your User model
const jwt = require('jsonwebtoken');

// Google OAuth configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5002/google/callback',
  passReqToCallback: true
},
async function (request, accessToken, refreshToken, profile, done) {
  try {
    // Extract the necessary information from the Google profile
    const email = profile.emails[0].value; // Correctly access email
    const displayName = profile.displayName;
    const photo = profile.photos[0]?.value || '';
    console.log(photo);

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      // If user exists, generate a token and return the user
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Pass the user and token
      return done(null, { user, token });
    } else {
      // If the user does not exist, create a new one
      const newUser = new User({
        voterId: displayName, // You can use displayName or another unique value
        email: email,
        name: profile.name?.givenName || displayName,
        pinCode: '', // Optional or default value
        password: '', // Password is not needed for OAuth
        isVerified: true,
        photo: photo, // Google profile photo
      });

      // Save the new user

      user = await newUser.save();

      // Generate a token for the new user
      const token = jwt.sign(
        { userId: user._id, name: user.name, email: user.email , photo: user.picture , pinCode : user.pinCode},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Pass the new user and token
      return done(null, { user, token });
    }
  } catch (err) {
    return done(err, false);
  }
}));

// Serialize and deserialize user for session
passport.serializeUser(function (data, done) {
  done(null, data); // Store user and token in the session
});

passport.deserializeUser(function (data, done) {
  done(null, data); // Recreate user and token from the session
});
