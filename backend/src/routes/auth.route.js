import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = express.Router();

router.get("/register", (req, res) => {
  return res.status(200).json({
    message: `Register running`,
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectedRoute, getMe);

export default router;
