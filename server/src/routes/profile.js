const app = require("express");
const profileRouter = app.Router();
const { userAuthCheck } = require("../middlewares/auth");
const { validateEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuthCheck, async (req, res) => {
  try {
    const { user } = req;
    res.json({
      message: "User Profile Data",
      data: user,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuthCheck, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Invalid Edit Input Fields, Please Try Again!");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.json({
      message: "User Profile Updated Successfully",
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
profileRouter.patch("/profile/password", userAuthCheck, async (req, res) => {
  try {
    // Extract old and new passwords from request body
    const { oldPassword, newPassword } = req.body;

    // Check if the new password is empty after trimming spaces (Incorrect condition fixed below)
    if (newPassword.trim() === "") {
      throw new Error("New Password Cannot Be Empty!");
    }

    // Get the authenticated user from req.user (set by authentication middleware)
    const loggedInUser = req.user;

    // Validate the old password by checking if it matches the stored password
    const isPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid Old Password, Please Try Again!");
    }

    // Hash the new password securely using bcrypt (hashing strength: 10 rounds)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password with the newly hashed password
    loggedInUser.password = hashedPassword;

    await loggedInUser.save();

    res.json({ message: "Password Updated Successfully" });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
