"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Pictures", [
      {
        url: "1_org_zoom.webp",
        pictureableType: "Product",
        pictureableId: 1,
      },
      {
        url: "1_org_zoom (1).webp",
        pictureableType: "Product",
        pictureableId: 1,
      },
      {
        url: "1_org_zoom (2).webp",
        pictureableType: "Product",
        pictureableId: 1,
      },
      {
        url: "1_org_zoom (3).webp",
        pictureableType: "Product",
        pictureableId: 1,
      },
      {
        url: "1_org_zoom (4).webp",
        pictureableType: "Product",
        pictureableId: 1,
      },
      {
        url: "2_org_zoom.webp",
        pictureableType: "ProductVariation",
        pictureableId: 2,
      },
      {
        url: "2_org_zoom (1).webp",
        pictureableType: "ProductVariation",
        pictureableId: 2,
      },
      {
        url: "2_org_zoom (2).webp",
        pictureableType: "ProductVariation",
        pictureableId: 2,
      },
      {
        url: "2_org_zoom (3).webp",
        pictureableType: "ProductVariation",
        pictureableId: 2,
      },
      {
        url: "2_org_zoom (4).webp",
        pictureableType: "ProductVariation",
        pictureableId: 2,
      },
      {
        url: "5_org_zoom.webp",
        pictureableType: "ProductVariation",
        pictureableId: 3,
      },
      {
        url: "5_org_zoom (1).webp",
        pictureableType: "ProductVariation",
        pictureableId: 3,
      },
      {
        url: "5_org_zoom (2).webp",
        pictureableType: "ProductVariation",
        pictureableId: 3,
      },
      {
        url: "5_org_zoom (3).webp",
        pictureableType: "ProductVariation",
        pictureableId: 3,
      },
      {
        url: "5_org_zoom (4).webp",
        pictureableType: "ProductVariation",
        pictureableId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Pictures", null, {});
  },
};
