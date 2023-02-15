'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("PropertiesValues",[
      {
        value: "XS",
        propertyId: 2,
      },
      {
        value: "S",
        propertyId: 2,
      },
      {
        value: "M",
        propertyId: 2,
      },
      {
        value: "L",
        propertyId: 2,
      },
      {
        value: "XL",
        propertyId: 2,
      },
      {
        value: "XXL",
        propertyId: 2,
      },
      {
        value: "34",
        propertyId: 2,
      },
      {
        value: "36",
        propertyId: 2,
      },
      {
        value: "38",
        propertyId: 2,
      },
      {
        value: "40",
        propertyId: 2,
      },
      {
        value: "4",
        propertyId: 5,
      },
      {
        value: "6",
        propertyId: 5,
      },
      {
        value: "8",
        propertyId: 5,
      },
      {
        value: "16",
        propertyId: 5,
      },
      {
        value: "32",
        propertyId: 5,
      },
      {
        value: "M1",
        propertyId: 6,
      },
      {
        value: "M2",
        propertyId: 6,
      },
      {
        value: "Purple",
        propertyId: 1,
      },
      {
        value: "Gold",
        propertyId: 1,
      },
      {
        value: "Black",
        propertyId: 1,
      },
      {
        value: "128 GB",
        propertyId: 8,
      },
      {
        value: "256 GB",
        propertyId: 8,
      },
      {
        value: "512 GB",
        propertyId: 8,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('PropertiesValues', null, {});
  }
};
