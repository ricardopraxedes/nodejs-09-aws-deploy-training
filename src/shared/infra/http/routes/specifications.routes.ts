import { CreateSpecificationController } from "@modules/cars/specifications/useCases/CreateSpecificationsController";
import { Router } from "express";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
