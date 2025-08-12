import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  recipe_name: String,
  estimated_time: Number,
  difficulty_level: { type: String, enum: ["easy", "average", "hard"] },
  portions_amount: Number,
  avg_rating: Number,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photo_path: String,
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
      amount: Number,
      unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    },
  ],
  steps: [
    {
      description: String,
      estimated_time: Number,
    },
  ],
  tips: [String],
  reviews: [
    {
      created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      created_at: { type: Date, default: Date.now },
      comment: String,
      value: Number,
    },
  ],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
