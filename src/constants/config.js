import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const port = process.env.NODE_ENV === "prod" ? process.env.PROD_PORT : process.env.DEV_PORT;
export const apiURL = process.env.NODE_ENV === "prod" ? process.env.BACK_PROD_URL : process.env.BACK_DEV_URL;
