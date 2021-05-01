import { SpecificationDTO } from "../dto/SpecificationDTO";
import { Specification } from "../infra/typeorm/model/Specification";

interface ISpecificationsRepository {
  create(data: SpecificationDTO): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
