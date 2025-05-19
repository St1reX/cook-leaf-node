//Express
const express = require("express");
const app = express();
var cors = require("cors");

//DB Connection
const dbConnect = require("./utils/db");

//Routes
const recipeRoutes = require("./routes/recipeRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const authRoutes = require("./routes/authRoutes");

{
  dbConnect();

  app.use(cors());
  app.use(express.json());
  app.use("/recipes", recipeRoutes);
  app.use("/ingredients", ingredientRoutes);
  app.use("/auth", authRoutes);

  app.listen(8080);
}
