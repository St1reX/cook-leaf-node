import Ingredient from "../../models/Ingredient.js";
import { errorTypes } from "../../errors/errorTypes.js";
import AppError from "../../errors/AppError.js";

export default class IngredientService {
  static async getIngredientsByName(searchTerm) {
    try {
      const regex = new RegExp("^" + searchTerm, "i");
      const ingredients = await Ingredient.find({ ingredient_name: regex }).limit(4).exec();
      console.log(ingredients);
      return ingredients;
    } catch (err) {
      throw new AppError("Database error while fetching ingredients", 500, errorTypes.INTERNAL, false, err);
    }
  }
}
