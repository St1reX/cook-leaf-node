import {
  getRecipeDetailsValidationSchema,
  getRecipesByNameValidationSchema,
  addRecipeValidationSchema,
} from "../../validation/recipeSchemas.js";
import RecipeService from "../services/recipeService.js";

export default class RecipeController {
  static async getRecipes(req, res, next) {
    try {
      const recipes = await RecipeService.getRecipes();

      res.status(200).json(recipes);
    } catch (err) {
      next(err);
    }
  }

  static async getRecipeDetails(req, res, next) {
    try {
      let recipeID = req.path.split("/");
      recipeID = recipeID[recipeID.length - 1];

      const validatedData = getRecipeDetailsValidationSchema.parse({ recipeID });

      const recipe = await RecipeService.getRecipeDetails(validatedData.recipeID);

      res.status(200).json(recipe);
    } catch (err) {
      next(err);
    }
  }

  static async getRecipesByName(req, res, next) {
    try {
      const validatedData = getRecipesByNameValidationSchema.parse(req.query);

      const recipes = await RecipeService.getRecipesByName(validatedData.name);

      res.json(recipes);
    } catch (err) {
      next(err);
    }
  }

  static async addRecipe(req, res, next) {
    try {
      const validatedData = addRecipeValidationSchema.parse(req.body);

      await RecipeService.addRecipe(validatedData);

      res.status(200).json({ message: "Recipe created successfully!" });
    } catch (err) {
      next(err);
    }
  }
}
