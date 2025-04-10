const app = require("express");
const { userAuthCheck } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = app.Router();

const USER_DATA = "fistName lastName photoURL gender age about";

userRouter.get("/user/requests/received", userAuthCheck, async (req, res) => {
  try {
    // first find if they authenticate
    const loggedInUser = req.user;

    // check if the user is logged in or not
    const isValidConnectionReq = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

    res.json({
      message: "Connection requests fetched successfully",
      data: isValidConnectionReq,
    });
  } catch (error) {
    return res.status(400).send("Error: ", error.message);
  }
});

userRouter.get("/user/connections", userAuthCheck, async (req, res) => {
  try {
    // check the loggedIn user
    const loggedInUserId = req.user;

    const isConnectionReq = await ConnectionRequest.find({}).populate(
      "fromUserId",
      USER_DATA
    );

    res.status(200).json({
      message: "Connection requests fetched successfully.",
      data: isConnectionReq,
    });
  } catch (error) {
    return res.status(400).send("Error: ", error.message);
  }
});

module.exports = userRouter;
