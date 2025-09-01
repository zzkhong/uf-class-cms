import { Sequelize } from 'sequelize';

const dbConfig = require('./sequelize.config.js');

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize({
  ...dbConfig,
  dialect: 'postgres',
  logging: env === 'development' ? console.log : false,
  dialectOptions: env !== 'development'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});
