const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/ddtg22atq/image/upload/v1705257136/Letscookit/default_suervg.png"
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

PostSchema.virtual("recipes", {
    ref: "Recipe",
    localField: "_id",
    foreignField: "post",
    justOne: false,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;