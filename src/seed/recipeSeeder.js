import Recipe from "../models/Recipe";
import User from "../models/User";
import Ingredient from "../models/Ingredient";
import Unit from "../models/Unit";
import Category from "../models/Category";

async function seedRecipe() {
  try {
    // Pobierz pierwszy dokument z każdej kolekcji
    const user = await User.findOne();
    const ingredient = await Ingredient.findOne();
    const unit = await Unit.findOne();
    const category = await Category.findOne();

    if (!user || !ingredient || !unit || !category) {
      throw new Error("Missing required documents in User, Ingredient, Unit, or Category collection.");
    } else if (await Recipe.findOne()) {
      console.log("Recipe already seeded!");
      return;
    }

    const recipe = new Recipe({
      recipe_name: "Spaghetti Bolognese",
      estimated_time: 45,
      difficulty_level: "average",
      portions_amount: 4,
      avg_rating: 4.5,
      created_by: user._id,
      photo_path: "https://cdn.aniagotuje.com/pictures/articles/2024/05/61816588-v-1500x1500.jpg",
      ingredients: [
        {
          ingredient: ingredient._id,
          amount: 200,
          unit: unit._id,
        },
      ],
      steps: [
        {
          description: "Cook the pasta according to package instructions.",
          estimated_time: 10,
        },
        {
          description: "Prepare the meat sauce in a separate pan.",
          estimated_time: 30,
        },
        {
          description: "Combine and serve with grated cheese.",
          estimated_time: 5,
        },
      ],
      tips: ["Use fresh basil for better taste", "Don't overcook the pasta"],
      reviews: [
        {
          created_by: user._id,
          comment: "Delicious and easy to make!",
          value: 5,
        },
      ],
      categories: [category._id],
    });

    await recipe.save();
    console.log("Recipe seeded successfully");
  } catch (err) {
    console.error("Error seeding recipe:", err.message);
  }
}

export default seedRecipe;
