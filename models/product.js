"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductProperty, {
        foreignKey: "productId",
      });
      Product.hasMany(models.ProductVariation, {
        foreignKey: "productId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.belongsTo(models.ProductCode, {
        foreignKey: "codeId",
      });
      Product.belongsTo(models.Store, {
        foreignKey: "storeId",
      });
      Product.hasMany(models.Picture, {
        foreignKey: "pictureableId",
        constraints: false,
        scope: {
          pictureableType: "Product",
        },
      });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      discription: DataTypes.STRING,
      codeId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      paranoid: true,
    }
  );
  return Product;
};
