//Express
import express from "express";
const app = express();
import cors from "cors";
import { port, apiURL } from "./constants/config.js";

//DB Connection
import dbConnect from "./utils/db.js";

//Middleware
import errorHandler from "./middleware/errorHandler.js";
import passport from "passport";
import cookieParser from "cookie-parser";

//Routes
import ingredientRoutes from "./routes/ingredientRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dbConnect();

//Build-in middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Passport
app.use(passport.initialize());

//Static files with caching
app.use(
  "/uploads",
  express.static("uploads", {
    maxAge: "1h",
    setHeaders: (res, filePath) => {
      res.set("Cache-Control", "public, max-age=3600");
    },
  })
);

//Routes to endpoints
app.use("/ingredients", ingredientRoutes);
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/recipes", recipeRoutes);
app.use("/units", unitRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(port);

console.log(`Server listening on ${port}`);
console.log(`API URL: ${apiURL}`);
