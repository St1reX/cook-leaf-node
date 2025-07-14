import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected with DB");
  } catch (error) {
    console.error("Error while connecting db: ", error);
    process.exit(1);
  }
}
