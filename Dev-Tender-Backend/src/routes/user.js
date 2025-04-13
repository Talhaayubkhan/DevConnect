const app = require("express");
const { userAuthCheck } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = app.Router();

const USER_DATA = "firstName lastName photoURL gender about";

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
    const loggedInUserId = req.user;

    // Fetch all accepted connection requests where the logged-in user
    // is either the sender or the receiver
    const acceptedConnections = await ConnectionRequest.find({
      $or: [
        {
          // Case 1: Someone sent me a connection request and I accepted it
          toUserId: loggedInUserId._id,
          status: "accepted",
        },
        {
          // Case 2: I sent someone a connection request and they accepted it
          fromUserId: loggedInUserId._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    // Extract only the "other user" from each accepted connection
    const connectedUsers = acceptedConnections.map((connection) => {
      // If I sent the request, return the person I sent it to
      if (
        connection.fromUserId._id.toString() === loggedInUserId._id.toString()
      ) {
        return connection.toUserId;
      }
      // Otherwise, I received the request — return the sender
      return connection.fromUserId;
    });

    res.json({ connectedUsers });
  } catch (error) {
    return res.status(400).send("Error: ", error.message);
  }
});

module.exports = userRouter;
