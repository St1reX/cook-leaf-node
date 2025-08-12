//Express
import express from "express";
const router = express.Router();

//Controller
import recipeController from "../modules/controllers/recipeController.js";

//Middleware
import { upload } from "../middleware/fileHandler.js";
import { authenticateJWT } from "../middleware/auth.js";

router.get("/", recipeController.getRecipes);
router.post("/", authenticateJWT, upload("recipes").single("photo"), recipeController.addRecipe);
router.get("/:id", recipeController.getRecipeDetails);
router.get("/search/autocomplete", recipeController.getRecipesByName);

export default router;
