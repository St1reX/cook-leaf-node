//Express
import express from "express";
const router = express.Router();

//Controller
import userController from "../modules/controllers/userController.js";

//JWT Middleware
import { authenticateJWT } from "../middleware/auth.js";

router.post("/favourites", authenticateJWT, userController.addRecipeToFavourites);
router.delete("/favourites", authenticateJWT, userController.removeRecipeFromFavourites);

router.post("/schedule", authenticateJWT, userController.addRecipeToScheduled);
router.delete("/schedule", authenticateJWT, userController.removeRecipeFromScheduled);

export default router;
