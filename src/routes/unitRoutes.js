//Express
import express from "express";
const router = express.Router();

//Controller
import unitController from "../modules/controllers/unitController.js";

router.get("/", unitController.getUnits);

export default router;
