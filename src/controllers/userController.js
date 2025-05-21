const mongoose = require("mongoose");
const User = require("../models/User");

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

module.exports = {
  addRecipeToFavourites,
  removeRecipeFromFavourites,
};
