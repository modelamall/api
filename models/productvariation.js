"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductVariation.hasMany(models.Picture, {
        foreignKey: "productVariationId",
      });
      ProductVariation.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      ProductVariation.belongsTo(models.Color, {
        foreignKey: "colorId",
      });
    }
  }
  ProductVariation.init(
    {
      productId: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      size: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductVariation",
      paranoid: true,
    }
  );
  return ProductVariation;
};
