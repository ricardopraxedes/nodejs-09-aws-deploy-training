import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarDTO } from "../../dto/CarDTO";

describe("List cars use case", () => {
  let carsRepository: ICarsRepository;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;

  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should list all available cars", async () => {
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

    const car = await carsRepository.create(carDTO);

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it("should list all available cars by name", async () => {
    const firstCarDTO = new CarDTO();

    Object.assign(firstCarDTO, {
      name: "Carro Um",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Um",

      category: null,
    });

    const secondCarDTO = new CarDTO();

    Object.assign(secondCarDTO, {
      name: "Carro Dois",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Dois",

      category: null,
    });

    const firstCar = await carsRepository.create(firstCarDTO);
    await carsRepository.create(secondCarDTO);

    const cars = await listAvailableCarsUseCase.execute({
      name: firstCar.name,
    });

    expect(cars).toEqual([firstCar]);
  });

  it("should list all available cars by brand", async () => {
    const firstCarDTO = new CarDTO();

    Object.assign(firstCarDTO, {
      name: "Carro Um",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Um",

      category: null,
    });

    const secondCarDTO = new CarDTO();

    Object.assign(secondCarDTO, {
      name: "Carro Dois",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Dois",

      category: null,
    });

    await carsRepository.create(firstCarDTO);
    const secondCar = await carsRepository.create(secondCarDTO);

    const cars = await listAvailableCarsUseCase.execute({
      brand: secondCar.brand,
    });

    expect(cars).toEqual([secondCar]);
  });

  it("should list all available cars by brand", async () => {
    const firstCarDTO = new CarDTO();

    Object.assign(firstCarDTO, {
      name: "Carro Um",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Um",

      category: null,
    });

    const secondCarDTO = new CarDTO();

    Object.assign(secondCarDTO, {
      name: "Carro Dois",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Dois",

      category: null,
    });

    await carsRepository.create(firstCarDTO);
    const secondCar = await carsRepository.create(secondCarDTO);

    const cars = await listAvailableCarsUseCase.execute({
      brand: secondCar.brand,
    });

    expect(cars).toEqual([secondCar]);
  });

  it("should list all available cars by category_id", async () => {
    const firstCarDTO = new CarDTO();

    Object.assign(firstCarDTO, {
      name: "Carro Um",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Um",

      category_id: "A",
    });

    const secondCarDTO = new CarDTO();

    Object.assign(secondCarDTO, {
      name: "Carro Dois",

      description: "description",

      daily_rate: 100,

      license_plate: "XXXX-XXX",

      fine_amount: 50,

      brand: "Marca Dois",

      category_id: "B",
    });

    await carsRepository.create(firstCarDTO);
    const secondCar = await carsRepository.create(secondCarDTO);

    const cars = await listAvailableCarsUseCase.execute({
      category_id: secondCar.category_id,
    });

    expect(cars).toEqual([secondCar]);
  });
});
