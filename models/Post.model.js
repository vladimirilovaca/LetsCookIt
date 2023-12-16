const mongoose = require("mongoose");

const PostSchema = mongoose.Schema ({
    name: {
        type: String, 
        required: true,
    },
    image: String, 
    restaurant: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ingredients: {
        type: [String],
    },
    process: {
        type: [String],
    },
    category: {
        type: String,
        enum: ["Meat", "Chicken", "Fish", "Dessert", "Salad", "Fruits", "Vegetables", "Vegan", "Vegetarian", "Gluten Free"],
        default: "Other",
    }
}, {
    virtual: true,
    timestamp: true,
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

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;