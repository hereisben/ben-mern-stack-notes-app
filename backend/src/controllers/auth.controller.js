import bcrypt from "bcryptjs";
import chalk from "chalk";
import { generateToken } from "../lib/generateToken.js";
import User from "../models/user.model.js";

export async function getMe(req, res) {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    console.error(chalk.bgRed(`Get me error:`, err));
    return res.status(500).json({
      message: `Interval server error`,
    });
  }
}

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

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: `Email and password are required`,
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: `Invalid email or password`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: `Invalid email or password`,
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: `Login successfully`,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(chalk.bgRed(`Login error:`, err));
    return res.status(500).json({
      message: `Internal server error`,
    });
  }
}

export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }

    const token = generateToken(req.user._id);

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  } catch (err) {
    console.error(chalk.bgRed(`Google auth callback error:`, err));
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};
