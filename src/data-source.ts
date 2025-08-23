import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { env } from './schemas/env.schema.parsed';

export const AppDataSource = new DataSource({
  type: env.DP_TYPE!,
  host: env.DP_HOST,
  port: env.DP_PORT,
  username: env.DP_USERNAME,
  password: env.DP_PASSWORD,
  database: env.DP_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
