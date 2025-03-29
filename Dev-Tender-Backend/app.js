require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const { validateSignUpData } = require("./src/utils/validation");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender, skills } = req.body;

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skills,
      password: hashedPassword,
    });
    await user.save();
    res.send("User Created Successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials, Please Try Again!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create token here
      const token = jwt.sign({ _id: user._id }, "aYzi3$<q`$FY>>,");
      // console.log("Token Generated: ", token);

      // add to cookie to send back to browser
      res.cookie("token", token);
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    // console.log("Cookie:", cookies);

    const { token } = cookies;
    // console.log("Token: ", token);

    if (!token) {
      throw new Error("Invalid Token!");
    }

    // verify the token

    const decodedInfo = jwt.verify(token, "aYzi3$<q`$FY>>,");
    // console.log("decoded User Info from Token: ", decodedInfo);

    const { _id } = decodedInfo;
    // console.log("User ID: ", _id);

    // find the user in the database
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found!");
    }

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
app.get("/users", async (req, res) => {
  // const userEmail = req.body.emailId;
  const userId = req.body.userId;

  try {
    const findId = await User.findById(userId);
    if (!findId) {
      res.status(404).send("User Not Found with id: " + userId);
    } else {
      res.send(findId);
    }
  } catch (error) {
    res.status(400).send("User Error");
  }

  // try {
  //   console.log(userEmail);
  //   const users = await User.find({ emailId: userEmail });
  //   if (!users) {
  //     res.status(404).send("User Not Found");
  //   } else {
  //     res.send(users);
  //   }
  // } catch (error) {
  //   res.status(400).send("User Error");
  // }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send("No Users Found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("User Error");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log(userId);

    const findId = await User.findOneAndDelete(userId);
    if (!findId) {
      res.status(404).send("User Not Found with id: " + userId);
    } else {
      res.send(findId);
    }
  } catch (error) {
    res.status(400).send("User Error");
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoURL", "skills", "age", "about", "gender"];

    if (Object.keys(data).includes("email")) {
      throw new Error("Email cannot be updated!");
    }

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates are not allowed!" + error.message);
    }

    const updateUser = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    // console.log(updateUser);
    if (!updateUser) {
      res.status(404).send("User Not Found with id: " + userId);
    } else {
      res.send(updateUser);
    }
  } catch (error) {
    res.status(400).send("User Error" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB Connected Successfully To Server");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error While Connecting to MongoDB", err);
  });
