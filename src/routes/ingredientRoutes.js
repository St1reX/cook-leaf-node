//Express
import express from "express";
const router = express.Router();

//Controller
import ingredientController from "../modules/controllers/ingredientController.js";

router.get("/", ingredientController.getIngredientsByName);

export default router;
