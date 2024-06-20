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

    get formattedAmount() {
      const separated = this.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const symbol = this.Currency.symbol;
      return symbol + separated;
    }

    relativeType(viewerAccountNumber) {
      if (this.ReceiverAccountNumber === viewerAccountNumber) {
        return 'Pemasukan';
      } else {
        return 'Pengeluaran';
      }
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
  Transfer.addHook('beforeCreate', async (transfer, options) => {
    const account = await transfer.getAccount();
    transfer.info = `Transfer dari ${account.accountNumber} ke ${transfer.ReceiverAccountNumber}. ${transfer.info}`;
  })
  return Transfer;
};