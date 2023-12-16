const mongoose = require("mongoose");

const PostSchema = mongoose.Schema ({
    name: {
        type: String, 
        required: true,
    },
    image: String, 
    restaurant: String,
    user: String, 
    creationDate: {
        type: Date, 
        default: Date.now
    },
}, {
    virtual: true,
}); 

PostSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "like",
    justOne: false,
}); 

PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "like",
    justOne: false,
});

PostSchema.virtual("recepies", {
    ref: "Recepie",
    localField: "_id",
    foreignField: "recepie",
    justOne: false,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;