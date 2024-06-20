'use strict';
const bcrypt = require('bcryptjs');
const fs = require('fs').promises

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

    try {
      const data = JSON.parse(await fs.readFile('./data/users.json', 'utf-8'));
      const fullData = data.map((item) => {
        item.password = bcrypt.hashSync(item.password, bcrypt.genSaltSync(10));
        item.updatedAt = new Date();
        item.createdAt = new Date();
        return item;
      })
      await queryInterface.bulkInsert('Users', fullData, {});

    } catch(error) {
      console.log(error);
    } 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
