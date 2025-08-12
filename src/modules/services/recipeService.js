import mongoose from "mongoose";
import Recipe from "../../models/Recipe.js";
import { errorTypes } from "../../errors/errorTypes.js";
import AppError from "../../errors/AppError.js";

export default class RecipeService {
  static async getRecipes() {
    try {
      const recipes = await Recipe.aggregate([
        {
          $project: {
            recipe_name: 1,
            estimated_time: 1,
            avg_rating: 1,
            photo_path: 1,
            reviews_count: { $size: "$reviews" },
          },
        },
      ]);
      return recipes;
    } catch (err) {
      throw new AppError("Database error while fetching recipes", 500, errorTypes.INTERNAL, false, err);
    }
  }

  static async getRecipeDetails(recipeId) {
    try {
      if (!mongoose.isValidObjectId(recipeId)) {
        throw new AppError("Invalid recipe ID format", 400, errorTypes.VALIDATION, false);
      }

      const recipe = await Recipe.findById(recipeId)
        .populate("categories")
        .populate("ingredients.ingredient")
        .populate("ingredients.unit")
        .exec();

      if (!recipe) {
        throw new AppError("Recipe not found!", 404, errorTypes.NOT_FOUND, false);
      }

      const recipeObj = recipe.toObject();
      recipeObj.reviews_count = recipe.reviews.length;
      return recipeObj;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(
        "Database error while fetching recipe details",
        500,
        errorTypes.INTERNAL,
        false,
        err
      );
    }
  }

  static async getRecipesByName(searchTerm) {
    try {
      const regex = new RegExp(searchTerm, "i");
      const recipes = await Recipe.find({ recipe_name: regex }).limit(8).exec();
      return recipes;
    } catch (err) {
      throw new AppError("Database error while searching recipes", 500, errorTypes.INTERNAL, false, err);
    }
  }

  static async addRecipe(recipeData) {
    try {
      const { name, difficulty_level, portions_amount, ingredients, steps, photoName } = recipeData;
      const parsedIngredients = JSON.parse(ingredients);
      const parsedSteps = JSON.parse(steps);

      const recipe = await Recipe.create({
        recipe_name: name,
        difficulty_level: difficulty_level,
        portions_amount: portions_amount,
        ingredients: parsedIngredients.map((element) => ({
          ingredient: mongoose.Types.ObjectId.createFromHexString(element._id),
          amount: element.amount,
          unit: element.unit_id,
        })),
        steps: parsedSteps.map((element) => ({
          description: element.description,
          estimated_time: element.estimated_time,
        })),
        estimated_time: parsedSteps.reduce((acc, step) => acc + step.estimated_time, 0),
        avg_rating: 5,
        photo_path: "http://localhost:8080/recipes/" + photoName,
      });

      return recipe;
    } catch (err) {
      throw new AppError("Database error while creating recipe", 500, errorTypes.INTERNAL, false, err);
    }
  }
}
