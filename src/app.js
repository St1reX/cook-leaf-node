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
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const authRoutes = require("./routes/authRoutes");
const unitRoutes = require("./routes/unitRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

{
  dbConnect();

  //Build-in middlewares
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  //Passport
  app.use(passport.initialize());

  //Static files with caching
  app.use(
    express.static(path.join(__dirname, 'uploads')),
    express.static(path.join(__dirname, 'uploads'), {
      maxAge: '1h',
      setHeaders: (res, path) => {
        res.set('Cache-Control', 'public, max-age=3600');
      },
    })
  );

  //Routes to endpoints
  app.use("/user", userRoutes);
  app.use("/recipes", recipeRoutes);
  app.use("/ingredients", ingredientRoutes);
  app.use("/units", unitRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/auth", authRoutes);
  app.use(errorHandler);

  app.listen(8080);
}
