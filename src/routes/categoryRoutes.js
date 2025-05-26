//Express
const express = require("express");
const router = express.Router();

//Controller
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);

module.exports = router;
