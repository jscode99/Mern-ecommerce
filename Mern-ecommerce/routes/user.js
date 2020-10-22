const express = require('express');
//Import express router
const router = express.Router();
//import controller
const {signup}=require('../controllers/Signup')


//routing
router.post('/signup',signup);


module.exports = router;