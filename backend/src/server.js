import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDatabase from "./config/connectDatabase.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import Note from "./models/note.model.js";
import notesRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://ben-notes-app.onrender.com/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(rateLimiter);

connectDatabase().then(() => {
  console.log(
    chalk.bgGreen(`Connected to MongoDB: ${mongoose.connection.name}`)
  );
  console.log(
    chalk.bgGray(`Using collection: ${Note.collection.collectionName}`)
  );
  app.get("/", (req, res) => {
    res.send("Ben Notes API is running!");
  });
  app.use("/api/notes", notesRoutes);
  app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server started at ${PORT}`));
  });
});
