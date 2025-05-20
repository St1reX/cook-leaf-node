const moment = require("moment");
const User = require("../models/User");

async function seedUsers() {
  if (await User.findOne()) {
    console.log("Users already seeded!");
    return;
  }

  const userExample = new User({
    password: "e15b02c1ec46fe2bc89e1cf752a3b8ce7ca1d84f9ee712322d4c321f925ae963",
    mail: "urygajakub@gmail.com",
    role: "admin",
    created_at: moment(),
    profile_picture_path: "http://localhost:8080/avatars/basicAvatar.png",
    scheduled_recipes: [],
    favourite_recipes: [],
  });

  await userExample.save();
}

module.exports = seedUsers;
