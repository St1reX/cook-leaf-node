//Express
const express = require("express");
const router = express.Router();

//Controller
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);

module.exports = router;
