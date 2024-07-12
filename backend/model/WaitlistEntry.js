const mongoose = require('mongoose');

const WaitlistEntrySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('WaitlistEntry', WaitlistEntrySchema);
