import { inject, injectable } from "tsyringe";
import { SpecificationDTO } from "../dto/SpecificationDTO";
import { Specification } from "../infra/typeorm/model/Specification";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: SpecificationDTO): Promise<Specification> {
    const specification = await this.specificationsRepository.create(data);
    return specification;
  }
}

export { CreateSpecificationUseCase };
