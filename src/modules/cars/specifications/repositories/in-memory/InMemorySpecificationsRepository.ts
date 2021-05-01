import { SpecificationDTO } from "../../dto/SpecificationDTO";
import { Specification } from "../../infra/typeorm/model/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class InMemorySpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create(data: SpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      ...data,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.some((id) => id === specification.id)
    );

    return specifications;
  }
}

export { InMemorySpecificationsRepository };
