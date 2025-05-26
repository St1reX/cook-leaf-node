const mongoose = require("mongoose");
const moment = require("moment");
const Category = require("../models/Category");

async function getCategories(req, res, next) {
  try {
    const searchTerm = req.query.name;

    const regex = new RegExp(searchTerm, "i");
    const categories = await Category.find({ category_name: regex }).limit(4).exec();

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCategories,
};
