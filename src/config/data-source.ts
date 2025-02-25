import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv.config({
  path: '.env',
});

const PostgresDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: false, // {
    //rejectUnauthorized: true,
    //} ,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
    migrations: ['dist/migration/*{.ts,.js}'],
}

export const PostgresDataSourceConfig = registerAs(
  'postgres',
  () => PostgresDataSourceOptions,
);

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);
