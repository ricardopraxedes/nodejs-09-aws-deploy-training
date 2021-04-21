import { inject, injectable } from "tsyringe";
import { ProfileDTO } from "../../dto/ProfileDto";
import { User } from "../../infra/typeorm/model/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";
import { ProfileMap } from "../../mapper/ProfileMap";

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
