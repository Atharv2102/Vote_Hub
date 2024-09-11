const mongoose = require('mongoose');

// Define the OTP schema
const OtpSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Linking to User model
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
});

// Create a model using the schema
const OtpVerification = mongoose.model('OtpVerification', OtpSchema);

module.exports = OtpVerification;
