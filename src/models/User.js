import mongoose from "mongoose";
import { apiURL } from "../constants/config.js";

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  mail: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  profile_picture_path: {
    type: String,
    default: `${apiURL}/uploads/avatar/basicAvatar.png`,
  },
  scheduled_recipes: [
    {
      date: Date,
      recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    },
  ],
  favourite_recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

const User = mongoose.model("User", userSchema);

export default User;
