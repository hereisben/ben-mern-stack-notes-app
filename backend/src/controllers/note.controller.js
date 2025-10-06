import chalk from "chalk";
import Note from "../models/note.model.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
    console.log(chalk.bgWhite("Get all notes successfully"));
  } catch (error) {
    console.error(chalk.bgRed("Error at getAllNotes", error));
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteByID(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      res
        .status(404)
        .json({ message: `Your note with ID ${req.params.id} not found` });
    console.log(chalk.bgBlue(`getNoteByID(${req.params.id}) successfully`));
    res.json(note);
  } catch (error) {
    console.error(chalk.bgRed(`Error at getNoteByID(${req.params.id})`, error));
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content, priority = "low" } = req.body;
    const newNote = new Note({ title, content, priority });
    const savedNote = await newNote.save();
    console.log(chalk.bgBlue(`createNote(${savedNote}) successfully`));
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(
      chalk.bgRed(`Error at createNote(${JSON.stringify(req.body)})`)
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote)
      console.warn(
        chalk.bgYellow(
          `deleteNote(${req.params.id}) do not find any note with ID ${req.params.id}`
        )
      );
    console.log(chalk.bgBlue(`deleteNote(${req.params.id}) successfully`));
    res
      .status(200)
      .json({ message: `Note ${deletedNote} deleted successfully` });
  } catch (error) {
    console.error(chalk.bgRed(`Error at deleteNote(${req.params.id})`, error));
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content, priority } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, priority },
      { new: true }
    );
    if (!updatedNote)
      console.warn(
        chalk.bgYellow(
          `update(${req.params.id}) do not find any note with ID ${req.params.id}`
        )
      );
    console.log(chalk.bgBlue(`updateNote(${req.params.id}) successfully`));
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(chalk.bgRed(`Error at updateNote(${req.params.id})`, error));
    res.status(500).json({ message: "Internal Server Error" });
  }
}
