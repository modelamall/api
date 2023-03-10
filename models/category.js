"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(Category, {
        foreignKey: "parentId",
        as: `parent`
      });
      Category.hasMany(Category, {
        foreignKey: "parentId",
        as: `sub`
      });
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
      });
      Category.hasMany(models.Filter, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
      paranoid: true,
    }
  );
  return Category;
};
