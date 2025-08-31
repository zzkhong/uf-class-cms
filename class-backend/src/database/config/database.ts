import { Sequelize } from 'sequelize';

const dbConfig = require('./sequelize.config.js');

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

export const sequelize = new Sequelize({
  ...config,
  dialect: 'postgres',
  logging: env === 'development' ? console.log : false,
});
