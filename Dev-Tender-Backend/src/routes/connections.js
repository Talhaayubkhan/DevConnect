const app = require("express");
const { userAuthCheck } = require("../middlewares/auth");
const connectionRouter = app.Router();

connectionRouter.post("/connections", userAuthCheck, (req, res) => {
  const { user } = req;

  res.send(
    `${user.firstName} ${user.lastName} has send a request to get connections`
  );
});

module.exports = connectionRouter;
