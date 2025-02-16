const router = require("express").Router();
const USER = require("../model/user.model");
const bcrypt = require("bcrypt");

router.post("/create",async(req,res)=>{
  try {
    const {email,password} = req.body;
    const olduser =await USER.findOne({email})
    if(olduser){
        return res.status(400).json({
            status:false,
            message:"User already exists"
        })
    }
    const hashPassword = await bcrypt.hash(password,10);
    const user =await USER.create({
        email,
        password:hashPassword
    })
    return res.status(201).json({
        status:true,
        message:"User created successfully",
        user
    })
  } catch (error) {
    return res.status(500).json({
        status:false,
        message:error.message
    })
  }
})
module.exports = router;