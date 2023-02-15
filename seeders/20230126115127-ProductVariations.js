"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ProductVariations", [
      {
        productId: 1,
        price: 43084.5,
        count: 100,
      },
      {
        productId: 1,
        price: 43882,
        count: 70,
      },
      {
        productId: 1,
        price: 43198.99,
        count: 55,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProductVariations", null, {});
  },
};
