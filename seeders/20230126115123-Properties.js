'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Properties",[
      {
        type: "Color",
      },
      {
        type: "Size",
      },
      {
        type: "Weight",
      },
      {
        type: "Length",
      },
      {
        type: "RAM",
      },
      {
        type: "CPU",
      },
      {
        type: "GPU",
      },
      {
        type: "Memory",
      },
      {
        type: "Screen size",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Properties', null, {});
  }
};
