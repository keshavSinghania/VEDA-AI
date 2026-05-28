import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined");
}

export const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});




redis.on("connect", () => {
  console.log("🔌 Redis connecting...");
});

redis.on("ready", () => {
  console.log("Redis is ready to use");
});

redis.on("error", (err) => {
  console.log("Redis error:", err.message);
});

redis.on("close", () => {
  console.log(" Redis connection closed");
});


(async () => {
  try {
    const res = await redis.ping();
    console.log("Redis PING:", res);
  } catch (err: any) {
    console.log("Redis PING failed:", err.message);
  }
})();

export default redis;