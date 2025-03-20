require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Khan",
    lastName: "Hello",
    emailId: "khan@example.com",
    passsword: "khan@123",
  });
  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (error) {
    res.status(400).send("User Error");
  }
});
connectDB()
  .then(() => {
    console.log("MongoDB Connected Successfully To Server");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error While Connecting to MongoDB", err);
  });
