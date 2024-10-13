import { User } from './src/user/user.entity';
import { Storage } from './src/storage/storage.entity';
import { Box } from './src/box/box.entity';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Storage, Box],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Disable synchronize when using migrations
});
