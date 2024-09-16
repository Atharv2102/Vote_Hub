const express = require('express');
const router = express.Router();
const {signup, login, logout, verifyOtp,resendOtp} = require('../controllers/authController');

// Example routes for login and registration
router.post("/signup",signup)

router.post('/login',login);

router.post('/logout', logout);
// router.post('./upload',upload);
router.post('/verify-otp', verifyOtp);
router.post("/resend-otp", resendOtp);


module.exports = router;