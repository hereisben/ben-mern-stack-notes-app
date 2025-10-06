import chalk from "chalk";
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `ip:${ip}`;

    const { success, limit, remaining, reset } = await ratelimit.limit(key);

    if (!success) {
      const count = limit - remaining;
      const resetTime = new Date(reset).toLocaleTimeString();
      console.log(
        chalk.bgBlue(
          `Ratelimiter reached: ${count}/ ${limit} requests used (resets at ${resetTime})`
        )
      );
      return res
        .status(429)
        .json({ message: "Too many request, please try again later" });
    }

    next();
  } catch (error) {
    console.error(chalk.bgRed(`Error at rateLimiter`, error));
    next(error);
  }
};

export default rateLimiter;
