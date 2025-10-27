const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read the token from req cookies
  //validate the token
  //find the user

  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send("Please Login 🚫")
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$79");
    // console.log(decodedObj)
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user=user
    next()
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  userAuth,
};
