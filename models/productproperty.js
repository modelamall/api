"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductProperty.belongsTo(models.Property, {
        foreignKey: "propertyId",
      });
      ProductProperty.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      ProductProperty.belongsTo(models.PropertiesValue, {
        foreignKey: "propertyValueId",
      });
    }
  }
  ProductProperty.init(
    {
      propertyId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      propertyValueId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductProperty",
    }
  );
  return ProductProperty;
};
