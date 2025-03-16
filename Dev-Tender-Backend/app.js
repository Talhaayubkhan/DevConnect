require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();

connectDB()
  .then(() => {
    console.log("MongoDB Connected Successfully To Server");
    app.listen(5000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error While Connecting to MongoDB", err);
  });
