const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
    },
    allowComments: {
        type: Boolean,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: String,
        required: true
    },
    dbDate:{
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Story", storySchema);