// backend/routes/vote.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming a User model for MongoD

const verifypincode = async (req, res) => {
  const { userId, pinCode } = req.body;
 // console.log(userId);
 // console.log(pinCode)
  try {
    // Find user by ID
    const user = await User.findById(userId);
    //console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the pinCode matches
    if (user.pinCode !== pinCode) {
      return res.status(400).json({ message: 'Invalid Pin Code' });
    }

    // Fetch candidates based on the pin code
    const candidates = await User.find({ pinCode });
    return res.status(200).json({ message: 'Pin Code Verified', candidates });
  } catch (error) {
    console.error('Error verifying pincode:', error); // Log error details
    return res.status(500).json({ message: 'Server Error', error });
  }
};


module.exports = { verifypincode};
