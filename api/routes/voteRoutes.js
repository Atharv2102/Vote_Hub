const express = require('express');
const router = express.Router();
const {verifypincode} = require('../controllers/voteController');
// Example routes for login and registration

router.post("/verifypincode" ,verifypincode);



module.exports = router;