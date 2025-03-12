const express = require("express");

const app = express();

app.use("/test", (req, res, next) => {
  res.send("Main Route");
  next();
});
app.get("/user", (req, res) => {
  // res.send(req.body);
  res.send({ firstName: "John", lastName: "Doe" });
});

app.post("/user", (req, res) => {
  res.send("User created successfully");
});

app.listen(5000, () => {
  console.log("Server running on port 3000");
});
