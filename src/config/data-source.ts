import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'task_master',
  entities: [__dirname + '/../infrastructure/database/entities/**/*.{ts,js}'],
  migrations: [
    __dirname + '/../infrastructure/database/migrations/**/*.{ts,js}',
  ],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
};

const AppDataSource = new DataSource(dataSourceOptions);

// Default export for TypeORM CLI compatibility
export default AppDataSource;
