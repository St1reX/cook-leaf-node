import {
  addRecipeToFavouritesValidationSchema,
  removeRecipeFromFavouritesValidationSchema,
  addRecipeToScheduledValidationSchema,
  removeRecipeFromScheduledValidationSchema,
} from "../../validation/userSchemas.js";
import UserService from "../services/userService.js";

export default class UserController {
  static async addRecipeToFavourites(req, res, next) {
    try {
      const validatedData = addRecipeToFavouritesValidationSchema.parse(req.body);

      await UserService.addRecipeToFavourites(req.user._id, validatedData.recipe_id);

      res.status(200).json({ message: "Recipe successfully added to favorites." });
    } catch (err) {
      next(err);
    }
  }

  static async removeRecipeFromFavourites(req, res, next) {
    try {
      const validatedData = removeRecipeFromFavouritesValidationSchema.parse(req.body);

      await UserService.removeRecipeFromFavourites(req.user._id, validatedData.recipe_id);

      res.status(200).json({ message: "Recipe successfully removed from favorites." });
    } catch (err) {
      next(err);
    }
  }

  static async addRecipeToScheduled(req, res, next) {
    try {
      const validatedData = addRecipeToScheduledValidationSchema.parse(req.body);

      await UserService.addRecipeToScheduled(
        req.user._id,
        validatedData.recipe_id,
        validatedData.scheduled_dates
      );

      res.status(200).json({ message: "Recipe successfully scheduled for selected dates." });
    } catch (err) {
      next(err);
    }
  }

  static async removeRecipeFromScheduled(req, res, next) {
    try {
      const validatedData = removeRecipeFromScheduledValidationSchema.parse(req.body);

      await UserService.removeRecipeFromScheduled(
        req.user._id,
        validatedData.recipe_id,
        validatedData.scheduled_date
      );

      res.status(200).json({ message: "Recipe successfully removed from scheduled date." });
    } catch (err) {
      next(err);
    }
  }
}
