const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
require("./config/database");

const app = express();
app.use(express.json()); //convert  into json --> req  <---

//posting a user  dynamic route /signup  in db
app.post("/signup", async (req, res) => {
  console.log(req.body);
  //creating a new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error saving user", err.message);
  }
});

//getting a user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    // const user = await User.find({ emailId: userEmail });
    if (!user) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("User not found");
  }
});

//getting the feed -> Feed Api Get /feed get all users from database:
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Somthing went wrong");
  }
});

//deleting a user via
app.delete("/user", async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.send("no user found");
    }
    res.send("user data deleted", user);
  } catch (err) {
    res.status(400).send("Somthing went wrong");
  }
});

//update a user data:
app.patch("/user", async (req, res) => {
  // const {userId}=req.body;
  const { emailId } = req.body;
  const data = req.body;
  console.log(data);
  console.log(emailId)
  try {
    // const user=await User.findByIdAndUpdate(userId,data, {returnDocument :"after"})
    const user = await User.findOneAndUpdate({emailId:emailId}, data, {
      returnDocument: "after",
    });
    console.log(user);
    res.send("user data update");
  } catch (err) {
    res.status(400).send("Somthing went wrong");
  }
});

//connecting DB and then listening to server
connectDB()
  .then(() => {
    console.log("DataBase connection established");
    app.listen(7777, () => {
      console.log("server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database not connceted", er);
  });
