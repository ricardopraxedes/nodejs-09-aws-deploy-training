import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { user } = request;

  if (!user.isAdmin) {
    throw new AppError("Operation not authorized.");
  }

  next();
}

export { ensureAdmin };
