import dotenv from 'dotenv'

const {
  DB_HOST,
  DB_USER,
  DB_PASS,
} = dotenv.config().parsed

export const dbConfig = {
  HOST: DB_HOST,
  USER: DB_USER,
  PASSWORD: DB_PASS,
  DB: "postgres",
  PORT: 8000,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
