import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Order } from "./Order";
import { Aliment } from "./Aliment";
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
