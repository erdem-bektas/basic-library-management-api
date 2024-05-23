import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import Borrow from './Borrow';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  name!: string;

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  borrows?: Borrow[];
}
