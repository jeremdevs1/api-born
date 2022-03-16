import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
