import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", (req, res) => {
  return res.status(200).json({
    message: `Register running`,
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
