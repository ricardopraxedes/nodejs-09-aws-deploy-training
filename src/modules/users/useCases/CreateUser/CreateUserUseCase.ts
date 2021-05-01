import { inject, injectable } from "tsyringe";
import { hashSync } from "bcryptjs";
import { UserDTO } from "@modules/users/dto/UserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: UserDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError("Email already in use.");
    }

    const passwordHash = hashSync(password, 8);

    await this.usersRepository.create({ email, password: passwordHash });
  }
}

export { CreateUserUseCase };
