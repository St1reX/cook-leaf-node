const User = require("../models/User");

async function registerUser(req, res) {
  const { email, password } = req.body;

  if (await User.find({ mail: email })) {
    res.status(400).json({ message: "User with provided mail already exists!" });
  }
}

module.exports = {
  registerUser,
};
