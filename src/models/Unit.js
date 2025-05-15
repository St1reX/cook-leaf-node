const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  unit_name: String,
  default_grams: Number,
});

module.exports = mongoose.model("Unit", unitSchema);
