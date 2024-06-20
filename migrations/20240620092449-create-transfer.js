'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.STRING
      },
      CurrencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Currencies',
          key: 'id'
        }
      },
      AccountId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transfers');
  }
};