"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ProductProperties", [
      {
        propertyId: 1,
        productVariationId: 1,
        propertyValueId: 18,
      },
      {
        propertyId: 1,
        productVariationId: 2,
        propertyValueId: 19,
      },
      {
        propertyId: 1,
        productVariationId: 3,
        propertyValueId: 20,
      },
      {
        propertyId: 5,
        productVariationId: 1,
        propertyValueId: 12,
      },
      {
        propertyId: 5,
        productVariationId: 2,
        propertyValueId: 12,
      },
      {
        propertyId: 5,
        productVariationId: 3,
        propertyValueId: 12,
      },
      {
        propertyId: 8,
        productVariationId: 1,
        propertyValueId: 21,
      },
      {
        propertyId: 8,
        productVariationId: 2,
        propertyValueId: 22,
      },
      {
        propertyId: 8,
        productVariationId: 3,
        propertyValueId: 23,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProductProperties", null, {});
  },
};
