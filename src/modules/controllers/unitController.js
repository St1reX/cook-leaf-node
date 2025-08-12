import UnitService from "../services/unitService.js";

export default class UnitController {
  static async getUnits(req, res, next) {
    try {
      const units = await UnitService.getUnits();

      res.status(200).json(units);
    } catch (err) {
      next(err);
    }
  }
}
