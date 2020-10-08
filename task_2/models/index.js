import Sequelize from 'sequelize'
import { dbConfig } from '../config/dbConfig.js'
import { userModel } from './userModel.js'

const { HOST,
        USER,
        PASSWORD,
        DB,
        PORT,
        dialect,
        pool: {
          max,
          min,
          acquire,
          idle,
        }
      } = dbConfig


const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect,
  operatorsAliases: false,

  pool: {
    max,
    min,
    acquire,
    idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = userModel(sequelize, Sequelize);

export default db
