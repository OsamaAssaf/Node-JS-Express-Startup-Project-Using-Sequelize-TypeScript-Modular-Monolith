import { Sequelize } from 'sequelize-typescript';
import { env } from '../schemas/env.schema.parsed';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: env.DP_HOST,
  database: env.DP_NAME,
  port: env.DP_PORT,
  username: env.DP_USERNAME,
  password: env.DP_PASSWORD,
  models: [__dirname + '/../models'],
});

export default sequelize;
