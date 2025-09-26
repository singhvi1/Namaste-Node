const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  (req, res) => {
    try {
      const user = req.user || "";

      //sending connection request
      res.send(`${user?.firstName} send the connection req`);
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Somthing went wrong " + err.message);
    }
  }
);

module.exports = requestRouter;
