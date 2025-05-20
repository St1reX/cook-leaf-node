//Express
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//DB Connection
const dbConnect = require("./utils/db");

//Middleware
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//Routes
const recipeRoutes = require("./routes/recipeRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const authRoutes = require("./routes/authRoutes");

{
  dbConnect();

  //Build-in middlewares
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  //Passport
  app.use(passport.initialize());

  //Static files
  app.use(express.static(path.join(__dirname, "uploads")));

  //Routes to endpoints
  app.use("/recipes", recipeRoutes);
  app.use("/ingredients", ingredientRoutes);
  app.use("/auth", authRoutes);
  app.use(errorHandler);

  app.listen(8080);
}
