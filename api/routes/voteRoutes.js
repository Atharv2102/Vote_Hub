const express = require('express');
const { vote } = require('../controllers/voteController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/vote', auth, vote);

module.exports = router;
