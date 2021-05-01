import { CarDTO } from "@modules/cars/car/dto/CarDTO";
import { ICarsRepository } from "@modules/cars/car/repositories/ICarsRepository";
import { getRepository } from "typeorm";
import { Car } from "../model/Car";

class CarsRepository implements ICarsRepository {
  private repository = getRepository(Car);

  async create(data: CarDTO): Promise<Car> {
    const car = this.repository.create({ ...data });

    await this.repository.save(car);

    return car;
  }

  listAvailable(
    name: string,
    brand: string,
    category_id: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where("available=:available", { available: true });

    if (name) {
      carsQuery.andWhere("name=:name", { name });
    }

    if (brand) {
      carsQuery.andWhere("brand=:brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("category_id=:category_id", { category_id });
    }

    return carsQuery.getMany();
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }
}

export { CarsRepository };
