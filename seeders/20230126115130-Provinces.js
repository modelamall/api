"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Provinces", [
      { name: "Istanbul", id: 34 },
      { name: "Ankara", id: 6 },
      { name: "Izmir", id: 35 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Provinces", null, {});
  },
};
