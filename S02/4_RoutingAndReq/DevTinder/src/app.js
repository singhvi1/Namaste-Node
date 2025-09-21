const express = require("express");

const app = express();

app.get(/^\/ab?c$/, (req, res) => {
  //response handler
  res.send({ firstName: "viaksh", lastName: "Kumar" });
});
//RouteParamters : paramas -> :id  -> /user/:id  -> /user/123
app.get("/user/id",(req,res)=>{
  const {id}=req.params
  console.log(id)
  res.send(`user Id: ${req.params.id}`)
})

app.get("/user",(req,res)=>{
  const {id}=req.params || "none"
  console.log(id)
  res.send(`user Id: ${req.params.id || "none"}`)
})


// app.get("/user", (req, res) => {
//   //response handler
//   res.send({ firstName: "viaksh", lastName: "Kumar" });
// });
// app.post("/user", (req, res) => {
//   //response handler
//   res.send("data successfully saved to database");
// });
// app.delete("/user", (req, res) => {
//   //data Deleted from db
//   res.send("data deleted successfully");
// });
// app.use((req, res) => {
//   //response handler
//   res.send("hello from the sever /");
// });

app.listen(3000, () => {
  console.log("server is successfully listeining on port");
});
