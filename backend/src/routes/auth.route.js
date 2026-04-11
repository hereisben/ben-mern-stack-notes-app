import express from "express";
import passport from "passport";
import {
  getMe,
  googleCallback,
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
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: true,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  googleCallback,
);

export default router;
