import bcrypt from "bcryptjs";
import chalk from "chalk";
import User from "../models/user.model.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: `Name, email, and password are required`,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: `Password must be at least 6 characters long`,
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        message: `Email is already in use`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    return res.status(201).json({
      message: `User register successfully`,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error(chalk.bgRed(`Register error`, err));
    return res.status(500).json({
      message: `Internal server error`,
    });
  }
}
