const EMAIL = require("../model/email.model");
const generateRandomEmail = require("../utils/helper");
const MAIL = require("../model/mails.models");

const router = require('express').Router();

router.get("/create",async(req,res)=>{
   try {
    const mail = generateRandomEmail();
    const saveToDb = await EMAIL.create({
        email:mail,
    })
    return res.status(201).json({
        success: true,
        message:"Email created successfully",
        data:saveToDb
    })
   } catch (error) {
    return res.status(500).json({
        status:false,
        message:error.message
    })
   }
})

router.get("/mail",async(req,res)=>{
   try {
    const {emailId} = req.body;
    const mails = await MAIL.findOne({email:emailId});
    if(!mails){
        return res.status(404).json({
            status: "Not Found",
            message:"No Mails found",
        })
    }
    return res.status(200).json({
        status:true,
        message:"sucessfuly got mail",
        data:mails
    })
   } catch (error) {
    return res.status(500).json({
        status:false,
        message:error.message
    })
   }
})


module.exports = router;