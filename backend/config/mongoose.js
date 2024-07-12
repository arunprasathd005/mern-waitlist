// backend/config/mongoose.js

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = 'mongodb://127.0.0.1:27017/waitlist-app2';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw new Error(err);
  }
};

module.exports = connectDB;
