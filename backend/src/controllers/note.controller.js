import chalk from "chalk";
import Note from "../models/note.model.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
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

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: `Not authorized to access this note`,
      });
    }

    console.log(chalk.bgBlue(`getNoteByID(${req.params.id}) successfully`));
    return res.status(200).json(note);
  } catch (error) {
    console.error(chalk.bgRed(`Error at getNoteByID(${req.params.id})`, error));
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content, priority = "low" } = req.body;
    const newNote = new Note({
      title,
      content,
      priority,
      user: req.user._id,
    });
    const savedNote = await newNote.save();
    console.log(chalk.bgBlue(`createNote(${savedNote}) successfully`));
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(
      chalk.bgRed(`Error at createNote(${JSON.stringify(req.body)})`),
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: `Not not found`,
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this note",
      });
    }

    await note.deleteOne();

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

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: `Not authorized to update this note`,
      });
    }

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.priority = priority ?? note.priority;

    const updatedNote = await note.save();

    console.log(chalk.bgBlue(`updateNote(${req.params.id}) successfully`));
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error(chalk.bgRed(`Error at updateNote(${req.params.id})`, error));
    res.status(500).json({ message: "Internal Server Error" });
  }
}
