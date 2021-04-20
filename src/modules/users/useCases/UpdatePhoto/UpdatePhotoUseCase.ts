import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { User } from "../../infra/typeorm/model/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

@injectable()
class UpdatePhotoUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("StorageProvider") private storageProvider: IStorageProvider
  ) {}

  async execute(user: User, photoName: string): Promise<void> {
    if (user.photoName) {
      await this.storageProvider.delete(user.photoName, "user-photos");
    }

    await this.storageProvider.save(photoName, "user-photos");

    const { email, password, id } = user;

    await this.usersRepository.create({ email, password, photoName, id });
  }
}

export { UpdatePhotoUseCase };
