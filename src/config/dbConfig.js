export const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "P1forPostgres",
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
