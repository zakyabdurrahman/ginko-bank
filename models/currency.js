'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Currency.hasMany(models.Account, {
        foreignKey: 'CurrencyId'
      })
    }
  }
  Currency.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    idrValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Currency',
  });
  return Currency;
};