
// require("dotenv").config();

// const express = require("express");
// const db = require("./config/mongoose");
// const cors = require("cors");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const socketio = require("socket.io");
// const Room = require("./model/Room");
// //const adminRoutes = require('./routes/adminRoutes');
// const PORT = process.env.PORT || 8000; // Use environment variable or default to 8000

// // Initialize mongoose connection
// db();

// // Create Express app
// const app = express();

// // Middleware setup
// // CORS setup to allow all origins and methods
// app.use(
//   cors({
//     origin: "*", // Allow requests from all origins (change to specific origin in production)
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   })
// );

// // Middleware to parse cookies
// app.use(cookieParser());

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Session middleware for managing sessions
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "keyboard cat", // Use environment variable or default secret
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // Routes
// app.use('/admin', adminRoutes);
// app.use("/", require("./routes/index"));

// // Create HTTP server for socket.io functionality
// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Initialize socket.io
// const io = socketio(server, {
//   cors: {
//     origin: "*", // Allow connections from all origins (change to specific origin in production)
//   },
// });

// // Socket.io event handling
// io.on("connection", (socket) => {
//   console.log(`Socket ${socket.id} connected`);

//   // Event to update leaderboard in real-time
//   socket.on("update-leaderboard", async (leaderboard) => {
//     try {
//       // Fetch updated scores (example using Room model)
//       let scores = await Room.findOne({ name: "LeaderBoard" }).populate({
//         path: "users",
//         populate: { path: "user", model: "User" },
//       });

//       console.log("Updated scores:", scores);
//       // Emit updated leaderboard to all connected clients
//       io.emit("updated-leaderboard", scores);
//     } catch (error) {
//       console.log("Socket could not get scores", error);
//     }
//   });

//   // Cleanup on socket disconnect
//   socket.on("disconnect", () => {
//     console.log(`Socket ${socket.id} disconnected`);
//   });
// });
require("dotenv").config();

const express = require("express");
const db = require("./config/mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const socketio = require("socket.io");
const Room = require("./model/Room");

const PORT = process.env.PORT || 8000; // Use environment variable or default to 8000

// Initialize mongoose connection
db();

// Create Express app
const app = express();

// Middleware setup
// CORS setup to allow all origins and methods
app.use(
  cors({
    origin: "*", // Allow requests from all origins (change to specific origin in production)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Session middleware for managing sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat", // Use environment variable or default secret
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
// Import admin routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

// Example index route
app.use("/", require("./routes/index"));

// Create HTTP server for socket.io functionality
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize socket.io
const io = socketio(server, {
  cors: {
    origin: "*", // Allow connections from all origins (change to specific origin in production)
  },
});

// Socket.io event handling
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  // Event to update leaderboard in real-time
  socket.on("update-leaderboard", async (leaderboard) => {
    try {
      // Fetch updated scores (example using Room model)
      let scores = await Room.findOne({ name: "LeaderBoard" }).populate({
        path: "users",
        populate: { path: "user", model: "User" },
      });

      console.log("Updated scores:", scores);
      // Emit updated leaderboard to all connected clients
      io.emit("updated-leaderboard", scores);
    } catch (error) {
      console.log("Socket could not get scores", error);
    }
  });

  // Cleanup on socket disconnect
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
