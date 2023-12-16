const mongoose = require("mongoose");


const LikeSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
})

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;