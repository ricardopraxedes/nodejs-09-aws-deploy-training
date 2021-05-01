import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/users/useCases/CreateUser/CreateUserController";
import { UpdatePhotoController } from "@modules/users/useCases/UpdatePhoto/UpdatePhotoController";
import { ShowUserProfileController } from "@modules/users/useCases/ShowUserProfile/ShowUserProfileController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const uploadPhoto = multer(uploadConfig);

const createUserController = new CreateUserController();
const updatePhotoController = new UpdatePhotoController();
const showUserProfileController = new ShowUserProfileController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/photo",
  ensureAuthenticated,
  uploadPhoto.single("photo"),
  updatePhotoController.handle
);

userRoutes.get(
  "/profile",
  ensureAuthenticated,
  showUserProfileController.handle
);

export { userRoutes };
