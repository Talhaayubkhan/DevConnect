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

      if (!fromUserId || !toUserId || !status) {
        return res.status(400).json({
          message: "Please provide all the required fields",
        });
      }

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
      // first we extract the loggedInUserId from the request object
      const loggedInUserId = req.user;
      // and then we extract the status and requestId from the request parameters
      const { status, requestId } = req.params;

      // and then check and validate the status and requestId
      const allowedValidStatuses = ["accepted", "rejected"];
      if (!allowedValidStatuses.includes(status)) {
        return res.status(400).json({
          message: `Invalid status '${status}'. Use 'accepted' or 'rejected'.`,
        });
      }

      // Validate the requestId by finding the connection request in the database
      // - _id ensures the request exists and matches the provided requestId
      // - toUserId ensures the logged-in user is the recipient of the request
      // - status: "interested" ensures the request is still pending and actionable
      const isValidRequestId = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId._id,
        status: "interested",
      });

      // If no matching request is found, return an error
      if (!isValidRequestId) {
        return res.status(404).json({
          message:
            "Request not found, already processed, or you’re not the recipient.",
        });
      }

      // Update the request's status to "accepted" or "rejected" based on user input
      isValidRequestId.status = status;
      const savedRequest = await isValidRequestId.save();

      res.json({
        message: `Congratualtions, You have ${status} the request`,
        data: savedRequest,
      });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);

module.exports = requestRouter;
