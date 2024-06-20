'use strict';
const fs = require('fs').promises;

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
    const rawData = JSON.parse(await fs.readFile('./data/bios.json', 'utf-8'));
    const data = rawData.map((item) => {
      item.createdAt = new Date();
      item.updatedAt = new Date();
      return item;
    }) 

    await queryInterface.bulkInsert('Bios', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bios', null, {});
  }
};
