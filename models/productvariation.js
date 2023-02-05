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
      ProductVariation.hasMany(models.ProductProperty, {
        foreignKey: "productVariationId",
      });
      ProductVariation.hasMany(models.Picture, {
        foreignKey: "pictureableId",
        constraints: false,
        scope: {
          pictureableType: "ProductVariation",
        },
      });
      ProductVariation.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  ProductVariation.init(
    {
      productId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
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
