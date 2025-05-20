//Express
const express = require("express");
const router = express.Router();

//Controller
const authController = require("../controllers/authController");

//JWT Middleware
const authenticateJWT = require("../middleware/auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authenticateJWT, authController.getUserDetails);

module.exports = router;
