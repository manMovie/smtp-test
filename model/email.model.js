const mongoose = require('mongoose');

const emailSchmea = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    allMails:[{
        type:mongoose.Types.ObjectId,
        ref:'Mail'
    }]
},{
    timestamps:true,
});

module.exports = mongoose.model('Email',emailSchmea);