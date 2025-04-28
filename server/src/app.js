require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/database");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { frontendOrigin } = require("./utils/constants");

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
