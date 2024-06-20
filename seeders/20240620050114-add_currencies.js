'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
        name: 'Indonesian Rupiah',         
        code: 'IDR',
        idrValue: 1
      },
      {
        name: 'United States Dollar',
        code: 'USD',
        idrValue: 16410
      },
      {
        name: 'Japanese Yen',
        code: 'JPY',
        idrValue: 103
      },
      {
        name: 'Euro',
        code: 'EUR',
        idrValue: 17633
      },
    ]
    await queryInterface.bulkInsert('Currencies', data.map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();
      return item;
    }), {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Currencies', null, {});
  }
};
