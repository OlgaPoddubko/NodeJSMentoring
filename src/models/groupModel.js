import DataTypes from 'sequelize/lib/data-types'

export const groupModel = (sequelize, Sequelize) => {
  class group extends Sequelize.Model {}

  group.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM({
        values: [ 'READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
      }))
    }
  }, {
    sequelize,
    timestamps: true
  })

  return group;
};
