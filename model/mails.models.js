const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    emailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Email',
        required: true,
        index: true // Faster lookups
    },
    sessionId: {
        type: String,
        trim: true
    },
    from: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    to: {
        type: [String], // Support multiple recipients
        required: true,
        trim: true,
        lowercase: true
    },
    text: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        trim: true
    },
    html: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Mail', mailSchema);
