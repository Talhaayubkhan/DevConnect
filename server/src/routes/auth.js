const app = require("express");
const authRouter = app.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender, skills, photoURL } =
      req.body;

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skills,
      photoURL,
      password: hashedPassword,
    });

    await user.save();
    res.send("User Created Successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials, Please Try Again!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create token here
      const token = user.getJWTToken();
      // attach token to cookie to send back to browser
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 900000),
        httpOnly: true,
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!");
});

module.exports = authRouter;
