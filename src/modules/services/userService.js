import mongoose from "mongoose";
import moment from "moment";
import User from "../../models/User.js";
import { errorTypes } from "../../errors/errorTypes.js";
import AppError from "../../errors/AppError.js";

export default class UserService {
  static async addRecipeToFavourites(userId, recipeId) {
    try {
      const userToModify = await User.findById(userId).exec();
      const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipeId);

      if (userToModify.favourite_recipes.includes(recipe_object_id)) {
        throw new AppError("Recipe is already in your favourites!", 400, errorTypes.VALIDATION, false);
      }

      userToModify.favourite_recipes.push(recipe_object_id);
      await userToModify.save();

      return userToModify;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(
        "Database error while adding recipe to favourites",
        500,
        errorTypes.INTERNAL,
        false,
        err
      );
    }
  }

  static async removeRecipeFromFavourites(userId, recipeId) {
    try {
      const userToModify = await User.findById(userId).exec();
      const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipeId);

      if (!userToModify.favourite_recipes.includes(recipe_object_id)) {
        throw new AppError("Recipe is not in your favourites!", 400, errorTypes.VALIDATION, false);
      }

      userToModify.favourite_recipes = userToModify.favourite_recipes.filter(
        (id) => id.toString() !== recipe_object_id.toString()
      );
      await userToModify.save();

      return userToModify;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError(
        "Database error while removing recipe from favourites",
        500,
        errorTypes.INTERNAL,
        false,
        err
      );
    }
  }

  static async addRecipeToScheduled(userId, recipeId, scheduledDates) {
    try {
      const userToModify = await User.findById(userId).exec();
      const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipeId);

      const alreadyScheduledDates = scheduledDates.filter((date) =>
        userToModify.scheduled_recipes.some(
          (entry) =>
            entry.recipe.toString() === recipe_object_id.toString() &&
            moment(entry.date).toDate("YYYY-MM-DD") === moment(date).toDate("YYYY-MM-DD")
        )
      );

      if (alreadyScheduledDates.length > 0) {
        throw new AppError(
          "One or more of the selected dates are already scheduled for this recipe!",
          400,
          errorTypes.VALIDATION,
          false
        );
      }

      scheduledDates.forEach((date) => {
        userToModify.scheduled_recipes.push({
          recipe: recipe_object_id,
          date: moment(date).toDate("YYYY-MM-DD"),
        });
      });

      await userToModify.save();

      return userToModify;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError("Database error while scheduling recipe", 500, errorTypes.INTERNAL, false, err);
    }
  }

  static async removeRecipeFromScheduled(userId, recipeId, scheduledDate) {
    try {
      const userToModify = await User.findById(userId).exec();
      const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipeId);

      userToModify.scheduled_recipes = userToModify.scheduled_recipes.filter(
        (entry) =>
          !(
            entry.recipe.toString() === recipe_object_id.toString() &&
            moment(entry.date).format("YYYY-MM-DD") === moment(scheduledDate).format("YYYY-MM-DD")
          )
      );

      await userToModify.save();

      return userToModify;
    } catch (err) {
      throw new AppError(
        "Database error while removing scheduled recipe",
        500,
        errorTypes.INTERNAL,
        false,
        err
      );
    }
  }
}
