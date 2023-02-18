"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cities", [
      { name: "Fatih", provinceId: 34 },
      { name: "Küçükçekmece", provinceId: 34 },
      { name: "Beylikdüzü", provinceId: 34 },
      { name: "Akyurt", provinceId: 6 },
      { name: "Altındağ", provinceId: 6 },
      { name: "Balçova", provinceId: 35 },
      { name: "Bayraklı", provinceId: 35 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Cities", null, {});
  },
};
