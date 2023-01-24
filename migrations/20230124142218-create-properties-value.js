'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertiesValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      propertyId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PropertiesValues');
  }
};