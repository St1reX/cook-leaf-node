const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  mail: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  profile_picture_path: String,
  scheduled_recipes: [
    {
      date: Date,
      recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    },
  ],
  favourite_recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = mongoose.model("User", userSchema);
