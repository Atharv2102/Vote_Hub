const express = require('express');
const router = express.Router();
const {signup, login, logout,updateProfile, verifyOtp,resendOtp , getUserByEmail} = require('../controllers/authController');

// Example routes for login and registration
router.post("/signup",signup)

router.post('/login',login);
router.post('/updateProfile' , updateProfile);
router.post('/logout', logout);
router.get('/getUserByEmail' , getUserByEmail);
// router.post('./upload',upload);
router.post('/verify-otp', verifyOtp);
router.post("/resend-otp", resendOtp);


module.exports = router;