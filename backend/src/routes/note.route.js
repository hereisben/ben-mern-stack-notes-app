import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteByID,
  updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;
