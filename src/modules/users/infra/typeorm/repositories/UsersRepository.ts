import { UserDTO } from "@modules/users/dto/UserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../model/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ email, password, photoName, id }: UserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      email,
      password,
      photoName,
    });

    this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}

export { UsersRepository };
