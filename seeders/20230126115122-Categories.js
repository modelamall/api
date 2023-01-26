'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories",[
      {
        name: "Sports & Outdoor",
      },
      {
        name: "Electronic",
      },
      {
        name: "Watches & Accessories",
      },
      {
        name: "Shoe bag",
      },
      {
        name: "Cosmetic",
      },
      {
        name: "Supermarket",
      },
      {
        name: "Home & Furniture",
      },
      {
        name: "Sportswear",
        parentId: 1,
      },
      {
        name: "Sports T-Shirt",
        parentId: 8,
      },
      {
        name: "Sports Shorts",
        parentId: 8,
      },
      {
        name: "Small Home Appliances",
        parentId: 2,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
