//Express
const express = require("express");
const router = express.Router();

//Controller
const userController = require("../controllers/userController");

//JWT Middleware
const authenticateJWT = require("../middleware/auth");

router.post("/favourites", authenticateJWT, userController.addRecipeToFavourites);
router.delete("/favourites", authenticateJWT, userController.removeRecipeFromFavourites);

router.post("/schedule", authenticateJWT, userController.addRecipeToScheduled);
//router.delete("/schedule", authenticateJWT, userController.removeRecipeFromScheduled);

module.exports = router;
