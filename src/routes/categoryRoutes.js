//Express
import express from "express";
const router = express.Router();

//Controller
import categoryController from "../modules/controllers/categoryController.js";

router.get("/", categoryController.getCategories);

export default router;
