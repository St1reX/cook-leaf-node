//Express
const express = require("express");
const router = express.Router();

//Controller
const unitController = require("../controllers/unitController");

router.get("/", unitController.getUnits);

module.exports = router;
