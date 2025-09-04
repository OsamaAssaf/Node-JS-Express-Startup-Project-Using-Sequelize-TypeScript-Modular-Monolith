import { Sequelize } from 'sequelize-typescript';
import { env } from '../schemas/env.schema.parsed';
import User from '../../modules/users/user/user.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: env.DP_HOST,
  database: env.DP_NAME,
  port: env.DP_PORT,
  username: env.DP_USERNAME,
  password: env.DP_PASSWORD,
  models: [User],
});

export default sequelize;
