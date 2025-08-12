import { getIngredientsByNameValidationSchema } from "../../validation/ingredientSchemas.js";
import IngredientService from "../services/ingredientService.js";

export default class IngredientController {
  static async getIngredientsByName(req, res, next) {
    try {
      const validatedData = getIngredientsByNameValidationSchema.parse(req.query);

      const ingredients = await IngredientService.getIngredientsByName(validatedData.name);

      res.status(200).json(ingredients);
    } catch (err) {
      next(err);
    }
  }
}
