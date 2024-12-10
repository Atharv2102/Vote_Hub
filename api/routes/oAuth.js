const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google OAuth callback route


// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');  // Redirect to home after logging out
  });
});

module.exports = router;
