const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredient_name: String,
  photo_path: String,
  nutrition_per_gram: {
    calories: Number,
    protein: Number,
    fat: Number,
    saturated_fat: Number,
    carbohydrates: Number,
    sugars: Number,
    fiber: Number,
    sodium: Number,
  },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
