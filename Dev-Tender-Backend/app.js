require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const router = express.Router();

// Application-level middleware: Logs every request
app.use((req, res, next) => {
  console.log("App Middleware: Request URL:", req.url);
  next();
});

// Router-level middleware: Logs only /api routes
router.use((req, res, next) => {
  console.log("Router Middleware: Request URL:", req.url);
  next();
});

// Route 1: Attached to the router
router.get("/user", (req, res) => {
  res.send("User Page");
});

// Route 2: Attached to the router
router.get("/profile", (req, res) => {
  res.send("Profile Page");
});

// Attach the router to the app
app.use("/api", router);

// Regular route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// connectDB()
//   .then(() => {
//     console.log("MongoDB Connected Successfully To Server");
//     app.listen(5000, () => {
//       console.log("Server running on port 3000");
//     });
//   })
//   .catch((err) => {
//     console.error("Error While Connecting to MongoDB", err);
//   });
app.listen(5000, () => {
  console.log("Server running on port 3000");
});
