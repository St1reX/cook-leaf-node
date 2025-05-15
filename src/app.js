//Express
const express = require("express");
const app = express();
var cors = require("cors");

//DB Connection
const dbConnect = require("./utils/db");

//Routes
const recipeRoutes = require("./routes/recipeRoutes");

{
  dbConnect();

  app.use(cors());
  app.use(express.json());
  app.use("/recipes", recipeRoutes);

  app.listen(8080);
}
