const moment = require("moment");
const User = require("../models/User");

async function seedUsers() {
  if (await User.findOne()) {
    console.log("Users already seeded!");
    return;
  }

  const userExample = new User({
    password: "5ad373f85aa33a9cb69c7ee4d5c8e1e375f997946a0a66ba7d248ea7b2a72c53",
    mail: "urygajakub@gmail.com",
    role: "admin",
    created_at: moment(),
    profile_picture_path:
      "https://i0.wp.com/profilesframe.com/wp-content/uploads/2019/06/I-Love-My-Dad-Profile-Picture-Frame.jpg",
    scheduled_recipes: null,
    favourite_recipes: null,
  });

  await userExample.save();
}

module.exports = seedUsers;
