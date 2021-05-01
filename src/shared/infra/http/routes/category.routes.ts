import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateCategoryController } from "@modules/cars/category/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/category/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/category/useCases/listCategory/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoryRoutes = Router();
const upload = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.use(ensureAdmin);

categoryRoutes.post("/", createCategoryController.handle);

categoryRoutes.get("/", listCategoryController.handle);

categoryRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoryRoutes };
