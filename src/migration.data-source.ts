import { DataSource } from 'typeorm';
import 'dotenv/config';

export const postgresMigrationsDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.PGPORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
});
