const User = require("../../models/User");
const { createHash } = require("crypto");
const JWT = require("jsonwebtoken");

async function registerUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const potentialExistingUser = await User.find({ mail: email }).exec();
    if (potentialExistingUser.length > 0) {
      const err = new Error("User with provided mail already exists!");
      err.status = 400;
      throw err;
    }

    const hashedPassword = createHash("sha256").update(password).digest("hex");
    await User.create({
      password: hashedPassword,
      mail: email,
      role: "user",
      profile_picture_path: "https://localhost:8080/uploads/avatars/basicAvatar.png",
      scheduled_recipes: [],
      favourite_recipes: [],
    });

    res.status(200).json({ message: "You have been registered successfully!", user: loggedUser });
  } catch (err) {
    next(err, req, res);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const hashedPassword = createHash("sha256").update(password).digest("hex");

    const loggedUser = await User.findOne({ mail: email, password: hashedPassword })
      .populate("favourite_recipes")
      .populate("scheduled_recipes.recipe")
      .exec();

    if (!loggedUser) {
      const err = new Error("Provided mail or password was incorrect!");
      err.status = 401;
      throw err;
    }

    const token = JWT.sign({}, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
      audience: "http://localhost:5173",
      issuer: "http://localhost:8080",
      subject: String(loggedUser._id),
    });

    res.status(200).cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
      domain: "localhost",
      secure: false,
    });

    res.json({ message: "You have been logged in successfully!", user: loggedUser });
  } catch (err) {
    next(err, req, res);
  }
}

async function getUserDetails(req, res, next) {
  try {
    const { _id } = req.user;

    const userDetails = await User.findById(_id)
      .populate("favourite_recipes")
      .populate("scheduled_recipes.recipe")
      .exec();

    res.status(200).json(userDetails);
  } catch (err) {
    next(err);
  }
}

async function logoutUser(req, res, next) {
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

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  logoutUser,
};
