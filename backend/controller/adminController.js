// const WaitlistEntry = require('../model/WaitlistEntry');

// const getWaitlist = async (req, res) => {
//   try {
//     const waitlist = await WaitlistEntry.find();
//     res.status(200).json(waitlist);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching waitlist', error });
//   }
// };

// const addWaitlistEntry = async (req, res) => {
//   const { email, position } = req.body;

//   try {
//     const newEntry = new WaitlistEntry({ email, position });
//     await newEntry.save();
//     res.status(201).json(newEntry);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding waitlist entry', error });
//   }
// };

// const editWaitlistEntry = async (req, res) => {
//   const { id } = req.params;
//   const { email, position } = req.body;

//   try {
//     const updatedEntry = await WaitlistEntry.findByIdAndUpdate(
//       id,
//       { email, position },
//       { new: true }
//     );
//     res.status(200).json(updatedEntry);
//   } catch (error) {
//     res.status(500).json({ message: 'Error editing waitlist entry', error });
//   }
// };

// const deleteWaitlistEntry = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await WaitlistEntry.findByIdAndDelete(id);
//     res.status(200).json({ message: 'Waitlist entry deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting waitlist entry', error });
//   }
// };

// module.exports = {
//   getWaitlist,
//   addWaitlistEntry,
//   editWaitlistEntry,
//   deleteWaitlistEntry,
// };
const User = require('../model/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new user
const addUser = async (req, res) => {
  const { name, email, password, role, verified, joinedRoom, winner, referralCode } = req.body;
  try {
    const newUser = new User({ name, email, password, role, verified, joinedRoom, winner, referralCode });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a user
const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, verified, joinedRoom, winner, referralCode } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, role, verified, joinedRoom, winner, referralCode },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUsers, addUser, editUser, deleteUser };
