//Express
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/recipes"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    req.body.photoName = uniqueName;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

//Controller
const recipeController = require("../controllers/recipeController");

router.get("/", recipeController.getRecipes);
router.post("/", upload.single("photo"), recipeController.addRecipe);
router.get("/:id", recipeController.getRecipeDetails);
router.get("/search/autocomplete", recipeController.getRecipesByName);

module.exports = router;
