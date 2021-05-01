import { CreateCarController } from "@modules/cars/car/useCases/CreateCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/car/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/car/useCases/ListAvailableCars/ListAvailableCarsController";
import { Router } from "express";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post("/", createCarController.handle);

carRoutes.post(
  "/specifications/:car_id",
  createCarSpecificationController.handle
);

carRoutes.get("/available", listAvailableCarsController.handle);

export { carRoutes };
