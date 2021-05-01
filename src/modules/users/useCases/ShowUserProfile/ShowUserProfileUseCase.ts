import { ProfileDTO } from "@modules/users/dto/ProfileDTO";
import { User } from "@modules/users/infra/typeorm/model/User";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { ProfileMap } from "@modules/users/mapper/ProfileMap";
import { inject, injectable } from "tsyringe";

@injectable()
class ShowUserProfileUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository
  ) {}

  async execute(user: User): Promise<ProfileDTO> {
    return ProfileMap.toDTO(user);
  }
}

export { ShowUserProfileUseCase };
