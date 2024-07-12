const router = require("express").Router();
const { protected } = require("../middleware/protected");

// Example controller imports
const { sendEMail } = require("../controller/otpController");

// Example model import (if needed)
const OTP = require("../model/OTP");

// Test endpoint to check if API is running
router.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

// Example protected route (requires authentication)
router.get("/home", protected, (req, res) => {
  res.status(200).json({ message: "You are an authenticated user" });
});

// Routes related to authentication (e.g., login, signup)
router.use("/auth", require("./auth"));

// Routes related to user details
router.use("/user", require("./user"));

// Testing route for time to live mongoose schema
// Example: router.use("/ttl", require("./ttl"));

// Error handling middleware (must be the last middleware in the chain)
router.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ message: "Internal Server Error" }); // Send a generic error response
});

module.exports = router;
