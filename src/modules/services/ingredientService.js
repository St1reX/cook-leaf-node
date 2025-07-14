import Ingredient from "../../models/Ingredient.js";
import { errorTypes } from "../../errors/errorTypes.js";

export default class IngredientService {
  async getIngredientsByName(searchTerm) {
    try {
      const ingredients = await Ingredient.find({ ingredient_name: searchTerm }).limit(4).exec();
      return ingredients;
    } catch (err) {
      throw new AppError("Database error while fetching ingredients", 500, errorTypes.INTERNAL, false, err);
    }
  }
}
