import Category from "../../models/Category.js";
import { errorTypes } from "../../errors/errorTypes.js";
import AppError from "../../errors/AppError.js";

export default class CategoryService {
  static async getCategoriesByName(searchTerm) {
    try {
      const regex = new RegExp(searchTerm, "i");
      const categories = await Category.find({ category_name: regex }).limit(4).exec();
      return categories;
    } catch (err) {
      throw new AppError("Database error while fetching categories", 500, errorTypes.INTERNAL, false, err);
    }
  }
}
