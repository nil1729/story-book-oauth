const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleID:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);