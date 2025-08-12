import * as z from "zod";

export const addRecipeToFavouritesValidationSchema = z.object({
  recipe_id: z
    .string({
      required_error: "Recipe ID is required",
      invalid_type_error: "Recipe ID must be a string",
    })
    .min(1, "Recipe ID cannot be empty"),
});

export const removeRecipeFromFavouritesValidationSchema = z.object({
  recipe_id: z
    .string({
      required_error: "Recipe ID is required",
      invalid_type_error: "Recipe ID must be a string",
    })
    .min(1, "Recipe ID cannot be empty"),
});

export const addRecipeToScheduledValidationSchema = z.object({
  recipe_id: z
    .string({
      required_error: "Recipe ID is required",
      invalid_type_error: "Recipe ID must be a string",
    })
    .min(1, "Recipe ID cannot be empty"),
  scheduled_dates: z
    .array(z.string().min(1, "Date cannot be empty"), {
      required_error: "Scheduled dates are required",
      invalid_type_error: "Scheduled dates must be an array",
    })
    .min(1, "At least one date must be provided"),
});

export const removeRecipeFromScheduledValidationSchema = z.object({
  recipe_id: z
    .string({
      required_error: "Recipe ID is required",
      invalid_type_error: "Recipe ID must be a string",
    })
    .min(1, "Recipe ID cannot be empty"),
  scheduled_date: z
    .string({
      required_error: "Scheduled date is required",
      invalid_type_error: "Scheduled date must be a string",
    })
    .min(1, "Scheduled date cannot be empty"),
});
