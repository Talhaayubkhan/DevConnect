const app = require("express");
const { userAuthCheck } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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
    return res.status(400).send(`Error: ${error.message}`);
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

userRouter.get("/feed", userAuthCheck, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // find all the connection requests where the loggedInUser is either sender or receiver
    const existingConnections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // we want hide those users from feed who are already connected with loggedInUser
    const excludedUserIdsFromFeed = new Set();

    existingConnections.forEach((connection) => {
      excludedUserIdsFromFeed.add(connection.fromUserId.toString());
      excludedUserIdsFromFeed.add(connection.toUserId.toString());
    });

    // Find users who are not connected and not the current user
    const showFeedUsers = await User.find({
      $and: [
        { _id: { $nin: Array.from(excludedUserIdsFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    res.send(showFeedUsers);
  } catch (error) {
    return res.status(400).send("Error: ", error.message);
  }
});

module.exports = userRouter;
