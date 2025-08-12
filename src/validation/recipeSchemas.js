import * as z from "zod";

export const getRecipeDetailsValidationSchema = z.object({
  recipeID: z.string().min(1, "Recipe ID is required"),
});

export const getRecipesByNameValidationSchema = z.object({
  name: z
    .string({
      required_error: "Please provide a search term",
      invalid_type_error: "Search term must be a string",
    })
    .min(1, "Search term cannot be empty"),
});

export const addRecipeValidationSchema = z.object({
  name: z
    .string({
      required_error: "Recipe name is required",
      invalid_type_error: "Recipe name must be a string",
    })
    .min(1, "Recipe name cannot be empty"),
  difficulty_level: z.enum(["easy", "average", "hard"], {
    required_error: "Difficulty level is required",
    invalid_type_error: "Difficulty level must be easy, average, or hard",
  }),
  portions_amount: z
    .number({
      required_error: "Portions amount is required",
      invalid_type_error: "Portions amount must be a number",
    })
    .min(1, "Portions amount must be at least 1"),
  ingredients: z.string().min(1, "Ingredients are required"),
  steps: z.string().min(1, "Steps are required"),
  photoName: z.string().optional(),
});
