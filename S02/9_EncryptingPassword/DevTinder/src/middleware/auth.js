const adminAuth = (req, res, next) => {
  console.log("admin auth is getting check");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Unathorized requsest by admin");
  }
};
const userAuth = (req, res, next) => {
  console.log("user auth is getting check");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send("Unathorized requsest by user");
  }
};


module.exports={
    adminAuth,userAuth
}