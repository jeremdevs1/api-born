import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinTable,
  ManyToMany,
} from "typeorm";

import { User } from "./user.entity";
import { Meal } from "./meal.entity";

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
