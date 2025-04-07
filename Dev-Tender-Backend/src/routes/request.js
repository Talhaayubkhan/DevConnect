const app = require("express");
const requestRouter = app.Router();
const { userAuthCheck } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
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
          message: `Invalid status '${requestStatus}'. Use 'interested' or 'ignored'.`,
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

      const isSameUserExist = await connectionRequest.findOne({
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
      const requestConnection = new connectionRequest({
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

module.exports = requestRouter;
