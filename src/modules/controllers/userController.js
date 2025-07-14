const mongoose = require("mongoose");
const moment = require("moment");
const User = require("../../models/User");

async function addRecipeToFavourites(req, res, next) {
  try {
    const userID = req.user._id;
    const { recipe_id } = req.body;

    const userToModify = await User.findById(userID).exec();
    const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipe_id);

    if (userToModify.favourite_recipes.includes(recipe_object_id)) {
      const err = new Error("Recipe is already in your favourites!");
      err.status = 400;
      throw err;
    }

    userToModify.favourite_recipes.push(recipe_object_id);
    await userToModify.save();

    res.status(200).json({ message: "Recipe successfully added to favorites." });
  } catch (err) {
    next(err, req, res);
  }
}

async function removeRecipeFromFavourites(req, res, next) {
  try {
    const userID = req.user._id;
    const { recipe_id } = req.body;

    const userToModify = await User.findById(userID).exec();
    const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipe_id);

    if (!userToModify.favourite_recipes.includes(recipe_object_id)) {
      const err = new Error("Recipe is not in your favourites!");
      err.status = 400;
      throw err;
    }

    userToModify.favourite_recipes = userToModify.favourite_recipes.filter(
      (id) => id.toString() !== recipe_object_id.toString()
    );
    await userToModify.save();

    res.status(200).json({ message: "Recipe successfully removed from favorites." });
  } catch (err) {
    next(err, req, res);
  }
}

async function addRecipeToScheduled(req, res, next) {
  try {
    const userID = req.user._id;
    const { recipe_id, scheduled_dates } = req.body;

    const userToModify = await User.findById(userID).exec();
    const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipe_id);

    const alreadyScheduledDates = scheduled_dates.filter((date) =>
      userToModify.scheduled_recipes.some(
        (entry) =>
          entry.recipe.toString() === recipe_object_id.toString() &&
          moment(entry.date).toDate("YYYY-MM-DD") === moment(date).toDate("YYYY-MM-DD")
      )
    );

    if (alreadyScheduledDates.length > 0) {
      const err = new Error("One or more of the selected dates are already scheduled for this recipe!");
      err.status = 400;
      throw err;
    }

    scheduled_dates.forEach((date) => {
      userToModify.scheduled_recipes.push({
        recipe: recipe_object_id,
        date: moment(date).toDate("YYYY-MM-DD"),
      });
    });

    await userToModify.save();

    res.status(200).json({ message: "Recipe successfully scheduled for selected dates." });
  } catch (err) {
    next(err, req, res);
  }
}

async function removeRecipeFromScheduled(req, res, next) {
  try {
    const userID = req.user._id;
    const { recipe_id, scheduled_date } = req.body;

    const userToModify = await User.findById(userID).exec();
    const recipe_object_id = mongoose.Types.ObjectId.createFromHexString(recipe_id);

    userToModify.scheduled_recipes = userToModify.scheduled_recipes.filter(
      (entry) =>
        !(
          entry.recipe.toString() === recipe_object_id.toString() &&
          moment(entry.date).format("YYYY-MM-DD") === moment(scheduled_date).format("YYYY-MM-DD")
        )
    );

    await userToModify.save();

    res.status(200).json({ message: "Recipe successfully removed from scheduled date." });
  } catch (err) {
    next(err, req, res);
  }
}

module.exports = {
  addRecipeToFavourites,
  removeRecipeFromFavourites,
  addRecipeToScheduled,
  removeRecipeFromScheduled,
};
