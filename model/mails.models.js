const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    emailId:{
        type:mongoose.Types.ObjectId,
        ref:'Email'
    },
    sessionId:{
        type:String
    },
    from:{
        type:String
    },
    to:{
        type:String
    },
    text:{
        type:String
    },
    subject:{
        type:String
    },
    html:{
        type:String
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('Mail',mailSchema);