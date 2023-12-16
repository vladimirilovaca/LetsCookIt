const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    process: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        enum: ["Meat", "Chicken", "Fish", "Dessert", "Salad", "Fruits", "Vegetables", "Vegan", "Vegetarian", "Gluten Free"],
        default: "Other",
    }
});

const Recipe = mongoose.model("Recipe", RecipeSchema)

module.exports = Recipe;