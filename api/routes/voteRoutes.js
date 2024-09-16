// backend/routes/vote.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming a User model for MongoDB
// const Candidate = require('../models/Candidate'); // Assuming a Candidate model for MongoDB

// Verify pincode and fetch candidates
router.post('/verify-pincode', async (req, res) => {
  const { userId, pinCode } = req.body;

  try {
    // Find user by ID and check if the pinCode matches
    const user = await User.findById(userId);
    if (!user || user.pinCode !== pinCode) {
      return res.status(400).json({ message: 'Invalid Pin Code' });
    }

    // Fetch candidates based on the pin code
    // const candidates = await Candidate.find({ pinCode });
    
    return res.status(200).json({ message: 'Pin Code Verified', candidates });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
