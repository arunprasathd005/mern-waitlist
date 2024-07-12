const User = require("../model/User");
const signJswtToken = require("../config/jwt");

// Register new user
const register = async (req, res) => {
  console.log(req);
  const { name, email, password } = req.body;

  // Check if name, email, and password are sent by client
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists. Please login." });
    }

    // Create a new user
    const createdUser = await User.create({ name, email, password });
    console.log("User created");
    return res.status(201).json({ user: createdUser });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
const login = async (req, res) => {
  console.log(req);
  const { email, password } = req.body.user;

  // Check if email and password are sent by client
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found. Please register." });
    }

    // Check if password matches
    if (password !== existingUser.password) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    // Generate JWT token
    const token = signJswtToken(existingUser.toJSON());

    // Return token to client
    return res.status(200).json({ message: "Logged in successfully", token: token });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
