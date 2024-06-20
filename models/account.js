'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User);
      Account.belongsTo(models.Currency, {
        foreignKey: 'CurrencyId'
      })
      Account.hasMany(models.Transfer);
    }

    get formattedAmount() {
      const separated = this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const symbol = this.Currency.symbol;
      return symbol + separated;
    }
  }
  Account.init({
    accountNumber: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    CurrencyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Currencies',
        key: 'id'
      }
    },
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};