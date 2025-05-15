const Recipe = require("../models/Recipe");

async function getRecipes({ res }) {
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
    res.status(500).json({
      communicate: "Internal server error occurred!",
      error: err,
    });
  }
}

module.exports = {
  getRecipes,
};
