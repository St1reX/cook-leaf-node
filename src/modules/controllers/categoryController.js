import { getCategoriesValidationSchema } from "../../validation/categorySchemas.js";
import CategoryService from "../services/categoryService.js";

export default class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const validatedData = getCategoriesValidationSchema.parse(req.query);

      const categories = await CategoryService.getCategoriesByName(validatedData.name);

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
}
