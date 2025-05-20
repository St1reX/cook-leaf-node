const User = require("../models/User");
const JWT = require("jsonwebtoken");
var { createHash } = require("crypto");

async function registerUser(req, res) {
  const { email, password } = req.body;

  const User_ = await User.find({ mail: email }).exec();
  console.log(User, email);

  if (User_.length > 0) {
    return res.status(400).json(User_);
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
}

module.exports = {
  registerUser,
};
