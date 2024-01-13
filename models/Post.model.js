const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dxydjpdrn/image/upload/v1705141730/Letscookit/profile_d7t5cn.avif'
    },
    restaurant: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        enum: ["Other", "Meat", "Chicken", "Fish", "Dessert", "Salad", "Fruits", "Vegetables", "Vegan", "Vegetarian", "Gluten Free", "Pasta"],
        default: "Other",
    }
}, {
    virtual: true,
    timestamp: true,
});

PostSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "post",
    justOne: false,
});

PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
    justOne: false,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;