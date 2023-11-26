const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;