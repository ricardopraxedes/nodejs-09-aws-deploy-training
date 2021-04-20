import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/files";
import { User } from "../../infra/typeorm/model/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

@injectable()
class UpdatePhotoUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository
  ) {}

  async execute(user: User, photoName: string): Promise<void> {
    if (user.photoName) {
      await deleteFile(`./tmp/user_photos/${photoName}`);
    }

    const { email, password, id } = user;

    await this.usersRepository.create({ email, password, photoName, id });
  }
}

export { UpdatePhotoUseCase };
