import { registerUserValidationSchema, loginUserValidationSchema } from "../../validation/authSchemas.js";
import AuthService from "../services/authService.js";

export default class AuthController {
  static async registerUser(req, res, next) {
    try {
      const validatedData = registerUserValidationSchema.parse(req.body);

      const newUser = await AuthService.registerUser(validatedData.email, validatedData.password);

      res.status(200).json({ message: "You have been registered successfully!", user: newUser });
    } catch (err) {
      next(err);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const validatedData = loginUserValidationSchema.parse(req.body);

      const { user, token } = await AuthService.loginUser(validatedData.email, validatedData.password);

      res.status(200).cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
        domain: "localhost",
        secure: false,
      });

      res.json({ message: "You have been logged in successfully!", user: user });
    } catch (err) {
      next(err);
    }
  }

  static async getUserDetails(req, res, next) {
    try {
      const { _id } = req.user;

      const userDetails = await AuthService.getUserDetails(_id);

      res.status(200).json(userDetails);
    } catch (err) {
      next(err);
    }
  }

  static async logoutUser(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
        domain: "localhost",
        secure: false,
      });

      res.status(200).json({ message: "You have been logged out successfully!" });
    } catch (err) {
      next(err);
    }
  }
}
