const mongoose = require("mongoose");

const connectDb = async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/temp-mail");
    console.log("db connetd")
  } catch (error) {
    console.log("error while connecting to db",error);
    process.exit(1);
  }

}
module.exports = connectDb;