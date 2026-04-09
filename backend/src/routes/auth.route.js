import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/register", (req, res) => {
  return res.status(200).json({
    message: `Register running`,
  });
});

router.post("/register", registerUser);

export default router;
