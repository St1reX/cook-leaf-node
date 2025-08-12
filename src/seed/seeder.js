import connectDB from "../utils/db";
import seedRecipe from "./recipeSeeder";
import seedUsers from "./userSeeder";
import seedUtils from "./utilsSeeder";

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

runSeeders().catch(console.error).then(process.exit(0));
