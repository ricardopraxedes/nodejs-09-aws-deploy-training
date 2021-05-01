import { AppError } from "@shared/errors/AppError";
import { validate } from "uuid";
import { CarDTO } from "../../dto/CarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create car use case", () => {
  let carRepository: ICarsRepository;
  let createCarUseCase: CreateCarUseCase;

  beforeEach(() => {
    carRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(carRepository);
  });

  it("should be possible to create a new car as available", async () => {
    const carDTO = new CarDTO();

    Object.assign(carDTO, {
      name: "name",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "brand",

      category: null,
    });

    const car = await createCarUseCase.execute(carDTO);

    expect(validate(car.id)).toBe(true);

    expect(car).toMatchObject({
      ...carDTO,
      available: true,
    });
  });

  it("should not be possible to create two cars with the same license_plate ", async () => {
    const carDTO = new CarDTO();

    Object.assign(carDTO, {
      name: "name",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "brand",

      category: null,
    });

    await createCarUseCase.execute(carDTO);

    expect(async () => {
      await createCarUseCase.execute(carDTO);
    }).rejects.toBeInstanceOf(AppError);
  });
});
