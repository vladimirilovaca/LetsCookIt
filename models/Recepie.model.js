const mongoose = require("mongoose"); 

const RecipeSchema = mongoose.Schema({

    content: {
        type: String,
        required: true,
    },
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
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;