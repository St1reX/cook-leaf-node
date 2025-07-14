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

app.use(errorHandler);

app.listen(8080);
