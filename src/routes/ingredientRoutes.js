//Express
const express = require("express");
const router = express.Router();

//Controller
const ingredientController = require("../controllers/ingredientController");

router.get("/", ingredientController.getIngredientsByName);

module.exports = router;
