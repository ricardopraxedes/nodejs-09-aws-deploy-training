import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/model/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface FilterOptions {
  name?: string;

  brand?: string;

  category_id?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ name, brand, category_id }: FilterOptions = {}): Promise<
    Car[]
  > {
    const cars = await this.carsRepository.listAvailable(
      name,
      brand,
      category_id
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
