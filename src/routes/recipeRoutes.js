//Express
const express = require("express");
const router = express.Router();

//Controller
const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeDetails);
router.get("/search/autocomplete", recipeController.getRecipesByName);

module.exports = router;
