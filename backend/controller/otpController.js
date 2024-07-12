
const nodemailer = require("nodemailer");
const { emailConfig } = require("../config/nodemailer");

const OTP = require("../model/OTP");
const User = require("../model/User");

// Create random number store it in MongoDB with TTL (time to live) documents
const createOtp = async (req, res, next) => {
  try {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const createdOTP = await OTP.create({
      email: req.user.email,
      otp: randomNumber,
    });
    console.log("createdOTP", createdOTP.otp);
    req.otp = createdOTP.otp;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const sendEMail = (req, res) => {
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: "arundg2001@gmail.com", // Sender address
    to: req.user.email, // List of receivers
    subject: "Verification Code", // Subject line
    html: `
      <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
        <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
          <div style="border-bottom: 1px solid #eee;">
            <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">Registration for iPhone 14</a>
          </div>
          <p style="font-size: 1.1em;">Hi, ${req.user.name}</p>
          <p>Use the following OTP to complete the verification process. OTP is valid for 5 minutes.</p>
          <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${req.otp}</h2>
          <p style="font-size: 0.9em;">Regards,<br />Your Brand</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
            <p>Realtime Waiting List</p>
            <p>Arun</p>
          </div>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent");
      return res.status(201).json({
        message: "You should receive an email",
        email: info,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

// Verify the OTP
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const findOTP = await OTP.findOne({ otp });
    console.log("findOTP", findOTP);

    if (!findOTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email: findOTP.email });

    if (user.email_verified) {
      return res.status(200).json({
        message: "Email already verified",
        user: user,
      });
    }

    user.email_verified = true;
    await user.save();
    console.log(user);

    res.status(200).json({
      message: "Email verified",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  createOtp,
  sendEMail,
  verifyOtp,
};
