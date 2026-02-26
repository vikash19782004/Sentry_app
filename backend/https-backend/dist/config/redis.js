import { Redis } from "ioredis";
const url = (process.env.REDIS_URL ?? process.env.REDIS) || "redis://127.0.0.1:6379";
export const redis = new Redis(url);
//# sourceMappingURL=redis.js.map