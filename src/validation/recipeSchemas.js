import * as z from "zod";

export const getRecipeDetailsValidationSchema = z.object({
  recipeID: z.number("Please provide a valid numeric Recipe ID"),
});
