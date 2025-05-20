const mongoose = require("mongoose");
const User = require("../models/User");

async function addRecipeToFavourites(req, res, next) {
  try {
    const userID = req.user._id;
    const { recipe_id } = req.body;

    const userToModify = await User.findById(userID).exec();
    const recipe_object_id = mongoose.Types.ObjectId(recipe_id);

    if (userToModify.favourite_recipes.includes(recipe_object_id)) {
      const err = new Error("Recipe is already in your favourites!");
      err.status = 400;
      throw err;
    }

    res.status(200).json({ message: "You have been logged out successfully!" });
  } catch (err) {
    next(err, req, res);
  }
}

module.exports = {
  addRecipeToFavourites,
};
