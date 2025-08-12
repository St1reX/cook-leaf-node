import * as z from "zod";

export const getCategoriesValidationSchema = z.object({
  name: z
    .string({
      required_error: "Please provide a search term",
      invalid_type_error: "Search term must be a string",
    })
    .min(1, "Search term cannot be empty"),
});
