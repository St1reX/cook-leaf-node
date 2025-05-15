const connectDB = require("../utils/db");
const seedRecipe = require("./recipeSeeder");
const seedUsers = require("./userSeeder");
const seedUtils = require("./utilsSeeder");

async function runSeeders() {
  try {
    //DB
    await connectDB();

    //Seeders
    await seedUsers();
    await seedUtils();
    await seedRecipe();

    console.log("Seeding ended successfully!");
  } catch (err) {
    console.error("Error occurred while seeding", err);
  }
}

runSeeders().catch(console.error);
