import Unit from "../../models/Unit.js";
import { errorTypes } from "../../errors/errorTypes.js";
import AppError from "../../errors/AppError.js";

export default class UnitService {
  static async getUnits() {
    try {
      const units = await Unit.find({});
      return units;
    } catch (err) {
      throw new AppError("Database error while fetching units", 500, errorTypes.INTERNAL, false, err);
    }
  }
}
