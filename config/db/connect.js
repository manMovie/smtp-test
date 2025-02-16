const mongoose = require("mongoose");

const connectDb = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_PROD_URL);
    console.log("db connetd")
  } catch (error) {
    console.log("error while connecting to db",error);
    process.exit(1);
  }

}
module.exports = connectDb;