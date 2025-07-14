import { ZodError } from "zod";
import { getIngredientsByNameValidationSchema } from "../../validation/ingredientSchemas.js";
import IngredientService from "../services/ingredientService.js";
import AppError from "../../errors/AppError.js";
import { errorTypes } from "../../errors/errorTypes.js";

const IngredientController = {
  async getIngredientsByName(req, res, next) {
    try {
      const validatedData = getIngredientsByNameValidationSchema.parse(req.query);

      const ingredients = await IngredientService.getIngredientsByName(validatedData.searchTerm);

      res.status(200).json(ingredients);
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new AppError("Validation error", 400, errorTypes.VALIDATION_ERROR, true));
      }

      next(err);
    }
  },
};

export default IngredientController;
