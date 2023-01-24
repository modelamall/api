'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Filter.init({
    categoryId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Filter',
    paranoid: true
  });
  return Filter;
};