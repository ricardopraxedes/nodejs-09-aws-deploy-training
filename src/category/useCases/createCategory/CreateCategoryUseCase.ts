import { CategoryRepository } from "../../repository/CategoryRepository";

class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(name: string, description: string) {
    this.categoryRepository.create(name, description);
  }
}

export { CreateCategoryUseCase };
