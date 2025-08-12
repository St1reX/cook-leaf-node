import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category_name: String,
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
