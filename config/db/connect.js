const mongoose = require("mongoose");

const connectDb = async()=>{
  try {
    await mongoose.connect("mongodb+srv://vabby:seufK1pJGIsmadS4@cluster0.okwqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("db connetd")
  } catch (error) {
    console.log("error while connecting to db",error);
    process.exit(1);
  }

}
module.exports = connectDb;