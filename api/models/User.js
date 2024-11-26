const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  voterId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  pinCode: { type: String, required: false }, // Make pinCode optional
  password: { type: String, required: false }, // Make password optional
  isVerified: { type: Boolean, default: false },
  photo: { type: String },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
