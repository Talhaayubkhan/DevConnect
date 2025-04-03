const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuthCheck = async (req, res, next) => {
  try {
    // 1. Read CLIENT'S token from cookies (via `req`)
    const { token } = req.cookies;

    // 2. Validate token (SERVER-side logic)
    if (!token) {
      // 3. Use `res` to reply to CLIENT
      throw new Error("Invalid token provided ");
    }

    const decodedObj = jwt.verify(token, "aYzi3$<q`$FY>>,");
    const { _id } = decodedObj;

    const user = await User.findById(_id).select("-emailId");
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user; // Make user available to all subsequent handlers
    next(); // Pass control to the next middleware/route
  } catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = {
  userAuthCheck,
};
