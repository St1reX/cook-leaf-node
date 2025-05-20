//Express
const express = require("express");
const router = express.Router();

//Controller
const userController = require("../controllers/userController");

//JWT Middleware
const authenticateJWT = require("../middleware/auth");

router.post("/favourites", authenticateJWT, userController.addRecipeToFavourites);

module.exports = router;
