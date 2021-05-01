import { UserDTO } from "../dto/UserDTO";
import { User } from "../infra/typeorm/model/User";

interface IUsersRepository {
  create(userData: UserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
