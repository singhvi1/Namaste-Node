const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const cookieParcer = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParcer());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
