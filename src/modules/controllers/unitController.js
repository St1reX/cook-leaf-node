const mongoose = require("mongoose");
const moment = require("moment");
const Unit = require("../models/Unit");

async function getUnits(req, res, next) {
  try {
    const units = await Unit.find({});

    res.status(200).json(units);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUnits,
};
