import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";
import swaggerFile from "../../../swagger.json";
import "../../container";
import { createDBConnection } from "../typeorm";
import { router } from "./routes";

createDBConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response
      .status(500)
      .json({ message: `Internal Server Error - ${error.message}` });
  }
);

export { app };
