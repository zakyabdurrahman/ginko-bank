'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bio.belongsTo(models.User);
    }
  }
  Bio.init({
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Bio',
  });
  return Bio;
};