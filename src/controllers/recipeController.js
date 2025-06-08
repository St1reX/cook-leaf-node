const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

async function getRecipes(req, res, next) {
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

async function getRecipeDetails(req, res, next) {
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
      .populate("ingredients.ingredient")
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

async function getRecipesByName(req, res, next) {
  try {
    const searchTerm = req.query.name;
    const regex = new RegExp(searchTerm, "i");
    const recipes = await Recipe.find({ recipe_name: regex }).limit(8).exec();

    res.json(recipes);
  } catch (err) {
    next(err);
  }
}

async function addRecipe(req, res, next) {
  try {
    const { name, difficulty_level, portions_amount, ingredients, steps, photoName } = req.body;
    const parsedIngredients = JSON.parse(ingredients);
    const parsedSteps = JSON.parse(steps);

    await Recipe.create({
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

    res.status(200).json({ message: "Recipe created successfully!" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getRecipes,
  getRecipeDetails,
  getRecipesByName,
  addRecipe,
};
