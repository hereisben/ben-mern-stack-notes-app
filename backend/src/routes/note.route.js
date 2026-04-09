import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteByID,
  updateNote,
} from "../controllers/note.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();
router.use(protectedRoute);

router.get("/", getAllNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;
