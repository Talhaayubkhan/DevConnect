require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const app = express();
const User = require("./src/models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (error) {
    res.status(400).send("User Error");
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
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    console.log(userId);

    const updateUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      lean: true,
    });
    // console.log(updateUser);
    if (!updateUser) {
      res.status(404).send("User Not Found with id: " + userId);
    } else {
      res.send(updateUser);
    }
  } catch (error) {
    res.status(400).send("User Error");
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
