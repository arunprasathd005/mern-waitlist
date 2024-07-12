// jwt.js

const jwt = require("jsonwebtoken");

// Secret key (replace with your actual secret key or use an environment variable)
const JWT_SECRET = "WAIT_LIST";

// Function to sign JWT token
const signJswtToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Example: Expires in 1 hour
};

module.exports = signJswtToken;
