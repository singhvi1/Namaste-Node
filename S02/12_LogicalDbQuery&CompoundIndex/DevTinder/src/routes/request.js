const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/user");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user; //-->thorw err if no user present
      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignore"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        return res.status(400).json({
          message: "invalid status " + status,
        });
      }
      //Check wheter toUser exist:
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "user not found" });
      }

      //checking previous Connections:
      const existingConnectionReq = await ConnectionRequestModel.findOne({
        $or: [
          ({ fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }),
        ],
      });
      if (existingConnectionReq) {
        return res.status(400).json({
          message: `Connection already exists`,
        });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      //sending connection request
      res.json({
        message: status ==="interested"? `${user?.firstName} send the connection request to ${toUser.firstName}`:`${user?.firstName} ignored the request of ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Somthing went wrong : " + err.message);
    }
  }
);

module.exports = requestRouter;
