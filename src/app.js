//Express
import express from "express";
const app = express();
import cors from "cors";
import path from "path";

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
import { env } from "process";

dbConnect();

//Build-in middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//Passport
app.use(passport.initialize());

//Static files with caching
app.use(
  express.static(path.join(path.dirname(new URL(import.meta.url).pathname), "uploads")),
  express.static(path.join(path.dirname(new URL(import.meta.url).pathname), "uploads"), {
    maxAge: "1h",
    setHeaders: (res, path) => {
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
app.use("/users", userRoutes);

app.use(errorHandler);

const port = env.NODE_ENV === "prod" ? env.PROD_PORT : env.DEV_PORT;
const apiURL = env.BACK_DEV_URL;
app.listen(port);

console.log(`Server listening on ${port}`);
console.log(`API URL: ${apiURL}`);
