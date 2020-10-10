export const userGroupModel = (sequelize, Sequelize) => {
  const UserGroup = sequelize.define("user_group", {
    user_id: {
      type: Sequelize.UUID
    },
    group_id: {
      type: Sequelize.UUID
    },
  });

  return UserGroup;
};
