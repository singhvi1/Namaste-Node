const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
require("./config/database");
const app = express();

app.use(express.json()); //convert  into json --> req  <---
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
