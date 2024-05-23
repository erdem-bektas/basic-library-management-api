import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import Borrow from './Borrow';

@Entity()
export default class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  name!: string;

  @Column('float', { default: -1 })
  averageRating!: number;

  @Column('int', { default: 0 })
  ratingCount!: number;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  borrows?: Borrow[];
}
