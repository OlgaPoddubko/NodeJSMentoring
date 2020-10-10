import Sequelize from 'sequelize'
import { dbConfig } from '../config/dbConfig.js'
import { userModel } from './userModel.js'
import { groupModel } from './groupModel.js'
import { userGroupModel } from './userGroupModel.js'

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
db.groups = groupModel(sequelize, Sequelize);
db.user_group = userGroupModel(sequelize, Sequelize);

db.users.belongsToMany(db.groups, {
  through: "user_group",
  as: "groups",
  foreignKey: "user_id",
});

db.groups.belongsToMany(db.users, {
  through: "user_group",
  as: "users",
  foreignKey: "group_id",
});

export default db
