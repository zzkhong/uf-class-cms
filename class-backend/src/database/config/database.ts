import { Sequelize } from 'sequelize';

import * as dbConfig from './sequelize.config';

const env = process.env.NODE_ENV || 'development';
const config = (dbConfig as any)[env];

export const sequelize = new Sequelize({
  ...config,
  logging: env === 'development' ? console.log : false,
});
