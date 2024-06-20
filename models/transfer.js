'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transfer.belongsTo(models.Currency, {
        foreignKey: 'CurrencyId'
      })
      Transfer.belongsTo(models.Account)
    }
  }
  Transfer.init({
    amount: DataTypes.INTEGER,
    type: DataTypes.STRING,
    info: DataTypes.STRING,
    CurrencyId: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER,
    ReceiverAccountNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transfer',
  });
  return Transfer;
};