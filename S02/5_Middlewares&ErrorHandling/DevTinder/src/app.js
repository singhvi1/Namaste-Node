const express = require("express");
// const { userAuth, adminAuth } = require("./middleware/auth");

const app = express();

//handling error
app.get("/getUserData", (req, res) => {
  try {
    throw new Error("dlsf");
    res.send("User data send");
  } catch (err) {
    res.status(500).send("handled by try catch")
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("something went wrong  handled by last errMiddleware");
  }
});

/*const auth = (req, res, next) => {
  console.log("admin auth is gettin check");
  const token = "xz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Unathorized requsest");
  }
};*/
/*app.use("/admin", (req, res, next) => {
  console.log("admin auth is gettin check");
  const token = "xz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Unathorized requsest");
  }
});*/

/**Middleware authentication
 * app.use("/admin",adminAuth);
app.get("/user/login",  (req, res, next) => {
  res.send("user login successfully");
});
app.post("/user/login", userAuth, (req, res, next) => {
  res.send("user login s uccessfully");
});
app.get("/admin/getAllData",  (req, res, next) => {
  res.send("All data sent");
});
app.delete("/admin/deleteUser",  (req, res) => {
  res.send("deleted a user");
});
 */

/**Routing 
 * app.use("/user",(req, res, next) => {
  console.log("this is global level ");
  next();
  // res.send("route handler at /user")
})

app.get(
  "/user",
  (req, res, next) => {
    console.log("handling second route");
    next();
    // res.send("route handler at /user")
  },
  (req, res, next) => {
    console.log("handling first route");
    next();
    // res.send("route handler at /user")
  },
  (req, res, next) => {
    console.log("handling third route");
    // next();
    res.send("route handler at third route");
  }
); */

app.listen(7777, () => {
  console.log("server is successfully listeining on port");
});
