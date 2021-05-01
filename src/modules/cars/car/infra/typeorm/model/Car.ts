import { Category } from "@modules/cars/category/infra/typeorm/model/Category";
import { Specification } from "@modules/cars/specifications/infra/typeorm/model/Specification";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "cars_specifications",
    joinColumn: { name: "car_id" },
    inverseJoinColumn: { name: "specification_id" },
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
    if (!this.available) {
      this.available = true;
    }
  }
}

export { Car };
