const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const Unit = require("../models/Unit");
const Ingredient = require("../models/Ingredient");

async function getRecipes(req, res) {
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

    res.status(200).json(recipes);
  } catch (err) {
    next(err, req, res);
  }
}

async function getRecipeDetails(req, res) {
  try {
    let recipeID = req.path.split("/");
    recipeID = recipeID[recipeID.length - 1];

    const notFoundErr = new Error("Recipe not found!");
    notFoundErr.status = 404;

    if (!mongoose.isValidObjectId(recipeID)) {
      throw notFoundErr;
    }

    const recipe = await Recipe.findById(recipeID)
      .populate("categories")
      .populate("ingredients.ingredient", "ingredient_name photo_path")
      .populate("ingredients.unit")
      .exec();

    if (!recipe) {
      throw notFoundErr;
    }

    const recipeObj = recipe.toObject();
    recipeObj.reviews_count = recipe.reviews.length;
    res.status(200).json(recipeObj);
  } catch (err) {
    next(err, req, res);
  }
}

module.exports = {
  getRecipes,
  getRecipeDetails,
};
