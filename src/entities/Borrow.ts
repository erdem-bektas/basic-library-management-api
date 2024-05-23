import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import User from './User';
import Book from './Book';

@Entity()
export default class Borrow {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  borrowDate!: Date;

  @Column({ nullable: true })
  returnDate!: Date;

  @Column('float', { nullable: true })
  rating?: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user!: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  book!: Book;
}
