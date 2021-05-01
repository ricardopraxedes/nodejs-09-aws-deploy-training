import { SpecificationDTO } from "@modules/cars/specifications/dto/SpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/specifications/repositories/ISpecificationsRepository";
import { getRepository, In, Repository } from "typeorm";
import { Specification } from "../model/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification> = getRepository(Specification);

  async create({
    name,
    description,
  }: SpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.find({ id: In(ids) });
    return specifications;
  }
}

export { SpecificationsRepository };
