const express = require("express");
const connectDb = require("./config/db/connect");
const { smtpServer } = require("./config/smtp/config.smtp");

const app = express();

app.get("/",function(req,res){
    res.send({
        status: 200,
        message:"Welcome to temp mail"
    })
})
connectDb();

smtpServer.listen(25,()=>{
    console.log("smtp server listening on port 25")
})
app.listen(4000,()=>{
    console.log("temp mail listening on port 4000")
})