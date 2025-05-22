const Ingredient = require("../models/Ingredient");

async function getIngredientsByName(req, res, next) {
  try {
    const searchTerm = req.query.name;

    const regex = new RegExp(searchTerm, "i");
    const ingredients = await Ingredient.find({ ingredient_name: regex }).limit(4).exec();

    res.status(200).json(ingredients);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getIngredientsByName,
};
