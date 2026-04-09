import chalk from "chalk";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function protectedRoute(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: `Not authorized, no token provided`,
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: `Not authorized, user not found`,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(chalk.bgRed(`Auth middleware error:`, err));
    return res.status(401).json({
      message: `Not authorized, token failed`,
    });
  }
}
