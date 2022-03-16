import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { User } from "./User";

import { Meal } from "./Meal";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  created_at: Date;

  @Column()
  delivered: boolean;

  @ManyToMany(() => Meal)
  @JoinTable()
  meals: Meal[];
}
