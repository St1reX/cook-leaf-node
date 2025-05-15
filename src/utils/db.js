require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected with DB");
  } catch (error) {
    console.error("Error while connecting db: ", error);
    process.exit(1);
  }
}

module.exports = connectDB;
