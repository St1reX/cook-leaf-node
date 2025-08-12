import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  unit_name: String,
  default_grams: Number,
});

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;
