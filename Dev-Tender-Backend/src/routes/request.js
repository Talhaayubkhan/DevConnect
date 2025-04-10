const app = require("express");
const requestRouter = app.Router();
const { userAuthCheck } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuthCheck,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // now we check some corner cases in our API to validate the API and protect them!
      // Define the valid statuses for a connection request
      const validStatuses = ["interested", "ignored"];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: `Invalid status '${status}'. Use 'interested' or 'ignored'.`,
        });
      }

      // Check if the target user exists in the database
      const targetUser = await User.findById(toUserId);
      if (!targetUser) {
        return res.status(404).json({
          message: "Target user not found. Please check the ID.",
        });
      }

      // Prevent duplicate requests between the same two users (in either direction)
      const isSameUserExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (isSameUserExist) {
        return res.status(400).json({
          message: "A connection request between these users already exists.",
        });
      }

      // Create a new connection request instance.
      const requestConnection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const savedRequest = await requestConnection.save();

      res.json({
        message: `${req.user.firstName} has ${status} the request of ${targetUser.firstName}`,
        data: savedRequest,
      });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuthCheck,
  async (req, res) => {
    try {
      // first we check the that user loggedIn
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      // then we validate the status?

      const isAllowedStatusValid = ["accepted", "rejected"];

      if (!isAllowedStatusValid.includes(status)) {
        return res.status(400).json({
          message: `Invalid status '${status}'. Use 'accepted' or 'rejected'.`,
        });
      }

      // then we check if the requestId is valid or not?
      const isConnectRequestValid = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!isConnectRequestValid) {
        return res.status(404).json({
          message: "Invalid connection request ID or status.",
        });
      }

      isConnectRequestValid.status = status;
      const savedData = await isConnectRequestValid.save();

      res.status(200).json({
        message: `Connection request ${status} successfully.`,
        data: savedData,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error: " + error.message,
      });
    }
  }
);

module.exports = requestRouter;
