import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  photoName: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose()
  photoUrl(): string {
    switch (process.env.STORAGE_PROVIDER) {
      case "local":
        return `${process.env.APP_URL}/user_photos/${this.photoName}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/user_photos/${this.photoName}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
