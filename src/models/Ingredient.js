import mongoose from "mongoose";

export const ingredientSchema = new mongoose.Schema({
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

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;
