import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface iTokenInfo {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as iTokenInfo;

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    request.user = user;
    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
