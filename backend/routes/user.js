const express = require('express');
const router = express.Router();
const { protected } = require('../middleware/auth');
const { createOtp, sendEMail, verifyOtp } = require('../controller/otp1Controller');
//const {protected} =require('../middleware/protected');

const {userInfo  } =require('../controller/userController');



// routes to room file
router.use('/room' , require('./room'));

//sends the user info after verificatoin 
router.get("/get-info" , protected ,  userInfo);




router.post('/get-otp', protected, createOtp, sendEMail);
router.post('/verify-otp', protected, verifyOtp);

module.exports = router;




