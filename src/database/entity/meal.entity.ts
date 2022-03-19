import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Aliment } from "./aliment.entity";

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  available: boolean;

  @ManyToMany(() => Aliment)
  @JoinTable()
  categories: Aliment[];
}
