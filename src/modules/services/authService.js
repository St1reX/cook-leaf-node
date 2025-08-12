import User from "../../models/User.js";
import { createHash } from "crypto";
import JWT from "jsonwebtoken";
import { errorTypes } from "../../errors/errorTypes.js";
import AppError from "../../errors/AppError.js";

export default class AuthService {
  static async registerUser(email, password) {
    try {
      const potentialExistingUser = await User.find({ mail: email }).exec();
      if (potentialExistingUser.length > 0) {
        throw new AppError("User with provided mail already exists!", 400, errorTypes.VALIDATION, false);
      }

      const hashedPassword = createHash("sha256").update(password).digest("hex");
      const newUser = await User.create({
        password: hashedPassword,
        mail: email,
        role: "user",
        profile_picture_path: "https://localhost:8080/uploads/avatars/basicAvatar.png",
        scheduled_recipes: [],
        favourite_recipes: [],
      });

      return newUser;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError("Database error while registering user", 500, errorTypes.INTERNAL, false, err);
    }
  }

  static async loginUser(email, password) {
    try {
      const hashedPassword = createHash("sha256").update(password).digest("hex");

      const loggedUser = await User.findOne({ mail: email, password: hashedPassword })
        .populate("favourite_recipes")
        .populate("scheduled_recipes.recipe")
        .exec();

      if (!loggedUser) {
        throw new AppError("Provided mail or password was incorrect!", 401, errorTypes.AUTHENTICATION, false);
      }

      const token = JWT.sign({}, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "1h",
        audience: "http://localhost:5173",
        issuer: "http://localhost:8080",
        subject: String(loggedUser._id),
      });

      return { user: loggedUser, token };
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError("Database error while logging in user", 500, errorTypes.INTERNAL, false, err);
    }
  }

  static async getUserDetails(userId) {
    try {
      const userDetails = await User.findById(userId)
        .populate("favourite_recipes")
        .populate("scheduled_recipes.recipe")
        .exec();

      if (!userDetails) {
        throw new AppError("User not found", 404, errorTypes.NOT_FOUND, false);
      }

      return userDetails;
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError("Database error while fetching user details", 500, errorTypes.INTERNAL, false, err);
    }
  }
}
