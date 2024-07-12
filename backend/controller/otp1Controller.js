const nodemailer = require('nodemailer');
const OTP = require('../model/OTP');
const User = require('../model/User');
const { emailConfig } = require('../config/nodemailer');

const createOtp = async (req, res, next) => {
  try {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const createdOTP = await OTP.create({
      email: req.user.email,
      otp: randomNumber,
    });
    console.log('createdOTP', createdOTP.otp);
    req.otp = createdOTP.otp;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

const sendEMail = (req, res) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: 'arundg2001@gmail.com',
    to: req.user.email,
    subject: 'OTP Verification',
    html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Registration for iPhone 14</a>
          </div>
          <p style="font-size:1.1em">Hi, ${req.user.name}</p>
          <p>Use the following OTP to complete the verification process. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${req.otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Realtime Waiting List</p>
            <p>Arun</p>
          </div>
        </div>
      </div>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log('Email sent');
      res.status(201).json({ message: 'You should receive an email', email: info });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const verifyOtp = async (req, res) => {
  try {
    const { email } = req.user;
    let { otp } = req.body;
    otp = Number(otp);

    const usersOTPs = await OTP.find({ email });

    for (let userOTP of usersOTPs) {
      if (userOTP.otp === otp) {
        console.log('OTP verified, updating user to verified');
        await User.findOneAndUpdate({ email: userOTP.email }, { verified: true,
          joinedRoom:true });

        let user = await User.findOne({ email });
        return res.status(200).json({ message: 'User verified', user });
      }
    }

    res.status(400).json({ message: 'Invalid OTP' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

module.exports = { createOtp, sendEMail, verifyOtp };
