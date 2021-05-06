import { ForgotPasswordController } from "@modules/users/useCases/ForgotPassword/useCases/ForgotPasswordController";
import { ResetPasswordController } from "@modules/users/useCases/ResetPassword/ResetPasswordController";
import { Router } from "express";

const passwordRoutes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", forgotPasswordController.handle);
passwordRoutes.post("/reset/:passwordToken", resetPasswordController.handle);

export { passwordRoutes };
