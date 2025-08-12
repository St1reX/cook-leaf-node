//Express
import express from "express";
const router = express.Router();

//Controller
import authController from "../modules/controllers/authController.js";

//JWT Middleware
import { authenticateJWT } from "../middleware/auth.js";

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authenticateJWT, authController.getUserDetails);

export default router;
