const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user || "";
      const fromUserId=user._id;
      const toUserId=req.params.toUserId;
      const status=req.params.status;

      const connectionRequest=new ConnectionRequestModel({
        fromUserId,toUserId,status
      }) ;
      await connectionRequest.save()

      //sending connection request
      res.send(`${user?.firstName} send the connection req`);
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Somthing went wrong " + err.message);
    }
  }
);

module.exports = requestRouter;
