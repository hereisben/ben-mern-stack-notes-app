import express from "express";
import { redis } from "../config/upstash";

const router = express.Router();

router.get("/ping-redis", async (req, res) => {
  try {
    await redis.ping();

    return res
      .status(200)
      .json({ ok: true, message: "Upstash Redis is alive" });
  } catch (error) {
    console.error("Redis ping failed:", error?.message || error);

    return res.status(500).json({ ok: false, message: "Redis ping failed" });
  }
});

export default router;
