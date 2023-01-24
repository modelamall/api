'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productProperty.init({
    propertyId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    property: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productProperty',
  });
  return productProperty;
};