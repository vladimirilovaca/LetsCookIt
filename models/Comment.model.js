const mongoose = require("mongoose");


const CommentSchema = mongoose.Schema({

    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recepie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recepie",
        required: true,
    }
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;