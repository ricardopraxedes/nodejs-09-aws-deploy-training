import redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: 5, // 10 requests
  duration: 5, // per 1 second by IP
});

const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

export { rateLimiterMiddleware };
