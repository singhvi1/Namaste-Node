const express=require("express");

const app=express();

app.use(function(req,res){  //response handler
    res.send("hello from the sever")
})
app.use("/hello",function(req,res){  //response handler
    res.send("hello from the sever  /hello")
})
app.use("/test",function(req,res){  //response handler
    res.send("hello from the sever from test")
})

app.listen(3000,()=>{
    console.log("server is successfully listeining on port")
})

