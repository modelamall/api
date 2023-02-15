'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ProductCodes",[
      {
        code: "MQ183TU/A"
      },
      {
        code: "MGN63TU/A"
      },
      {
        code: "SM-X200NZAATUR"
      },
      {
        code: "6941487262243"
      },
      {
        code: "VG247Q1A"
      },
      {
        code: "LS43BM700UUXUF"
      },
      {
        code: "34wl750-b"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('ProductCodes', null, {});
  }
};
