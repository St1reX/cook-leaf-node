//Express
const express = require("express");
const router = express.Router();

//Controller
const recipeController = require("../controllers/recipeController");

//Middleware
const upload = require("../middleware/fileHandler");
const authenticateJWT = require("../middleware/auth");

router.get("/", recipeController.getRecipes);
router.post("/", authenticateJWT, upload("recipes").single("photo"), recipeController.addRecipe);
router.get("/:id", recipeController.getRecipeDetails);
router.get("/search/autocomplete", recipeController.getRecipesByName);

module.exports = router;
