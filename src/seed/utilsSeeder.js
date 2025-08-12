import Unit from "../models/Unit";
import Category from "../models/Category";
import Ingredient from "../models/Ingredient";

async function seedUtils() {
  if (await Category.findOne()) {
    console.log("Utils already seeded!");
    return;
  }

  // Categories
  const categories = [
    { category_name: "Soups" },
    { category_name: "Salads" },
    { category_name: "Main Dishes" },
    { category_name: "Side Dishes" },
    { category_name: "Breakfast" },
    { category_name: "Desserts" },
    { category_name: "Snacks" },
    { category_name: "Beverages" },
    { category_name: "Appetizers" },
    { category_name: "Breads" },
    { category_name: "Pasta" },
    { category_name: "Seafood" },
    { category_name: "Vegetarian" },
    { category_name: "Vegan" },
    { category_name: "Gluten-Free" },
    { category_name: "Grilling & BBQ" },
    { category_name: "Slow Cooker" },
    { category_name: "Low-Carb" },
    { category_name: "Keto" },
    { category_name: "Holiday" },
    { category_name: "Kids' Recipes" },
    { category_name: "Quick & Easy" },
    { category_name: "Comfort Food" },
    { category_name: "World Cuisine" },
    { category_name: "High-Protein" },
    { category_name: "Low-Fat" },
  ];

  // Units
  const units = [
    { unit_name: "gram", default_grams: 1 },
    { unit_name: "kilogram", default_grams: 1000 },
    { unit_name: "milliliter", default_grams: 1 },
    { unit_name: "liter", default_grams: 1000 },
    { unit_name: "teaspoon", default_grams: 5 },
    { unit_name: "tablespoon", default_grams: 15 },
    { unit_name: "cup", default_grams: 240 },
    { unit_name: "ounce", default_grams: 28.35 },
    { unit_name: "pound", default_grams: 453.59 },
  ];

  // One basic ingredient
  const ingredients = [
    {
      ingredient_name: "Salt",
      photo_path: "https://www.drholdright.co.uk/wp-content/uploads/2020/01/iStock-516450576.jpg",
      nutrition_per_gram: {
        calories: 0,
        protein: 0,
        fat: 0,
        saturated_fat: 0,
        carbohydrates: 0,
        sugars: 0,
        fiber: 0,
        sodium: 390,
      },
    },
  ];

  await Category.insertMany(categories);
  await Unit.insertMany(units);
  await Ingredient.insertMany(ingredients);
}

export default seedUtils;
