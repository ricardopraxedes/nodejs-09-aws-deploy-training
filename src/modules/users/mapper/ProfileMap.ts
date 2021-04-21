import { classToClass } from "class-transformer";
import { ProfileDTO } from "../dto/ProfileDto";
import { User } from "../infra/typeorm/model/User";

class ProfileMap {
  static toDTO({ id, email, photoUrl, photoName }: User): ProfileDTO {
    return classToClass({
      id,
      email,
      photoName,
      photoUrl,
    });
  }
}

export { ProfileMap };
