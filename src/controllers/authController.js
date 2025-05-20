const User = require("../models/User");
const JWT = require("jsonwebtoken");
var { createHash } = require("crypto");

async function registerUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const potentialExistingUser = await User.find({ mail: email }).exec();
    if (potentialExistingUser.length > 0) {
      console.log("if sie wykonal");

      const err = new Error("User with provided mail already exists.");
      err.status = 400;
      throw err;
    }

    await User.create({
      password: createHash("sha256").update(password).digest("hex"),
      mail: email,
      role: "user",
      profile_picture_path: "/uploads/avatars/basicAvatar.png",
      scheduled_recipes: [],
      favourite_recipes: [],
    });

    res.status(200); // END THIS
  } catch (err) {
    next(err, req, res);
  }
}

module.exports = {
  registerUser,
};
