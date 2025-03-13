const express = require("express");

const app = express();

app.use(
  "/",
  (req, res, next) => {
    console.log("Starting express");
    // res.send("Hello, World! 1");
    next();
  },
  (req, res, next) => {
    console.log("Handling GET request for /user");
    // res.send("User 1 details");
    next();
  }
);

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling GET request for /user");
    res.send("User 1 details");
    next();
  },
  (req, res, next) => {
    console.log("Handling GET request for /user");
    res.send("User 2 details");
    next();
  },
  (req, res, next) => {
    console.log("Handling GET request for /user");
    res.send("User 3 details");
    next();
  }
);
app.get("/hello", (req, res, next) => {
  console.log("Handling GET request for /user");
  res.send("User 1 details");
  next();
});

app.use("/user", (req, res, next) => {
  console.log("Ending express");
  res.send("Hello, World! 3");
  // next();
});

app.listen(5000, () => {
  console.log("Server running on port 3000");
});
