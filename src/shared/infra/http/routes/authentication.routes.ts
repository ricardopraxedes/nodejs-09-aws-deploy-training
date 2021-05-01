import { AuthenticateUserController } from "@modules/users/useCases/AuthenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post("/sessions", authenticateUserController.handle);

export { authenticationRoutes };
