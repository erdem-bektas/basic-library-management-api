import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import User from './entities/User';
import Book from './entities/Book';
import Borrow from './entities/Borrow';

dotenv.config();

const entities = [User, Book, Borrow]

const AppDataSource = new DataSource ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: entities,
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
