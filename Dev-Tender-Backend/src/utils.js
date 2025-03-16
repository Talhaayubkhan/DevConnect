app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/error", (req, res) => {
  // console.log(err);
  // try {
  throw new Error("this is ErrorMessage");
  // res.send("User Recive the Data from the server");
  // } catch (error) {
  // console.log(error);
  // res.status(500).send("Something went wrong. Please try again");
  // }
});

app.use("/", (err, req, res, next) => {
  console.error(err.stack);
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

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
