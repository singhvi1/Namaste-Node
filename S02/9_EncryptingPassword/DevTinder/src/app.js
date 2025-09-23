const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParcer = require("cookie-parser");

app.use(express.json()); //convert  into json --> req  <---
app.use(cookieParcer());

//login API a user:
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //generate JWT token

      //add the token to cookie and send the response bcak to the user;
      res.cookie("token", "lsdfkjslkdfjldsfjlkdsjfoijovnoriw");

      res.send("Login successfull");
    } else {
      throw new Error("Invalid Crendential");
    }
  } catch (err) {
    res.status(500).send("Error : " + err.message);
  }
});

//get the profile
app.get("/profile", (req, res) => {
  const {token}=req.cookies;
  console.log(token);
  res.send("reading cookies");
});

//posting a user  dynamic route /signup  in db
app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    //Encrpt the password
    const { password, firstName, lastName, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed || data?.skills?.length > 10) {
      throw new Error("->Update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user data update");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Somthing went wrong " + err.message);
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
    console.log("Database not connceted " + err.message);
  });
