const express = require('express');
const router = express.Router();
const {verifypincode} = require('../controllers/voteController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Example routes for login and registration
router.post("/verifypincode", isAuthenticated ,verifypincode);



module.exports = router;