import { Options } from 'sequelize';

type Config = {
  [key: string]: Options;
};

const config: Config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
  },
};

export default config;
