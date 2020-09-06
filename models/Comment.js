const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);