import { validate } from "uuid";
import { SpecificationDTO } from "../dto/SpecificationDTO";
import { InMemorySpecificationsRepository } from "../repositories/in-memory/InMemorySpecificationsRepository";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationsUseCase";

describe("Create Specification Use Case", () => {
  let specificationsRepository: ISpecificationsRepository;
  let createSpecificationUseCase: CreateSpecificationUseCase;

  beforeEach(() => {
    specificationsRepository = new InMemorySpecificationsRepository();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepository
    );
  });

  it("should be possible to create a new specification", async () => {
    const specificationDTO = new SpecificationDTO();

    Object.assign(specificationDTO, {
      name: "specification name",
      description: "specification description",
    });

    const specification = await createSpecificationUseCase.execute(
      specificationDTO
    );

    expect(validate(specification.id)).toBe(true);
    expect(specification).toMatchObject(specificationDTO);
  });
});
