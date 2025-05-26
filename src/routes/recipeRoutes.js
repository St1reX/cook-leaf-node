//Express
const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

//Controller
const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.getRecipes);
router.post("/", upload.single("photo"), recipeController.addRecipe);
router.get("/:id", recipeController.getRecipeDetails);
router.get("/search/autocomplete", recipeController.getRecipesByName);

module.exports = router;
