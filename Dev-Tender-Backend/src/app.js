const express = require("express");
const app = express();
// const { adminAuthCheck, userAuthCheck } = require("./middlewares/auth");

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getUserData", (req, res) => {
  // console.log(err);
  try {
    throw new Error("this is ErrorMessage");
    res.send("User Recive the Data from the server");
  } catch (error) {
    // console.log(error);
    res.status(500).send("Something went wrong. Please try again");
  }
});

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     console.log(err);

//     res.status(500).send("Something went wrong");
//   }
// });

//middleware and route handlers

// app.use("/admin", adminAuthCheck, (req, res, next) => {
//   // console.log("Starting express");
//   res.send("Admin Recive the Data from the server");
//   next();
// });
// app.post("/admin/updateName", adminAuthCheck, (req, res, next) => {
//   // console.log("Starting express");
//   res.send("Admin update the name of the user");
//   next();
// });

// app.get("/user", userAuthCheck, (req, res, next) => {
//   res.send("USER GET THE DATA");
//   next();
// });
// app.get("/user/login", (req, res, next) => {
//   res.send("USER Login successfully");
//   next();
// });

app.listen(5000, () => {
  console.log("Server running on port 3000");
});
