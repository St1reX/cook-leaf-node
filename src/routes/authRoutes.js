//Express
const express = require("express");
const router = express.Router();

//Controller
const authController = require("../controllers/authController");
const authenticateJWT = require("../middleware/auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authenticateJWT, authController.getUserDetails);

module.exports = router;
