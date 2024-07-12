//  const jwt = require("jsonwebtoken");
//const User = require("../model/User");

// const protected = async (req, res, next) => {
//   try {
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       let token = req.headers.authorization.split(" ")[1];

//       // Use the correct JWT secret key
//       const jwtSecretKey = "WAIT_LIST";

//       const verified = jwt.verify(token, jwtSecretKey);
//       if (verified) {
//         let isValid = await User.findById({ _id: verified._id });

//         if (isValid) {
//           console.log("protected middleware verified jwt");
//           req.user = isValid;
//           next();
//         } else {
//           res.status(400).send({ message: "user doesn't exist" });
//         }
//       } else {
//         return res.status(401).send({ message: "Invalid token" });
//       }
//     } else {
//       return res.status(401).send({ message: "Token required" });
//     }
//   } catch (err) {
//     return res.status(401).send(err);
//   }
// };

// module.exports = { protected };
const jwt = require('jsonwebtoken');

const protected = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'WAIT_LIST'); // Ensure you use the correct secret key
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role === "admin") {
    return res.status(403).json({ message: 'Not authorized, admin access required' });
  }
  next();
};

module.exports = {
  protected, // Renamed to avoid conflict with existing usage
  isAdmin,
};

