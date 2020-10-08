export const userModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
    },
    login: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    isDeleted: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
