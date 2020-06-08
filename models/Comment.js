const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    story:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    },
    comment: {
        type: String,
        required: true
    },
    dbDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    createdAt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchema);