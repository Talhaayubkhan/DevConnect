const app = require("express");
const { userAuthCheck } = require("../middlewares/auth");
const requestRouter = app.Router();

requestRouter.post(
  "/request/send/interested/:touserId",
  userAuthCheck,
  (req, res) => {
    const { user } = req;

    res.send(
      `${user.firstName} ${user.lastName} has send a request to get connections`
    );
  }
);

module.exports = requestRouter;
