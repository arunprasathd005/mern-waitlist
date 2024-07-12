// const express = require('express');
// const router = express.Router();
// const { getWaitlist, addWaitlistEntry, editWaitlistEntry, deleteWaitlistEntry } = require('../controller/adminController');
// const { protected, isAdmin } = require('../middleware/auth');

// // Route definitions with middleware
// router.get('/waitlist', protected, isAdmin, getWaitlist);
// router.post('/waitlist', protected, isAdmin, addWaitlistEntry);
// router.put('/waitlist/:id', protected, isAdmin, editWaitlistEntry);
// router.delete('/waitlist/:id', protected, isAdmin, deleteWaitlistEntry);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getUsers, addUser, editUser, deleteUser } = require('../controller/adminController');
const { protected, isAdmin } = require('../middleware/auth');

// User routes
router.get('/users', protected, isAdmin, getUsers);
router.post('/users', protected, isAdmin, addUser);
router.put('/users/:id', protected, isAdmin, editUser);
router.delete('/users/:id', protected, isAdmin, deleteUser);

module.exports = router;
