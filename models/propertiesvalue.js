"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PropertiesValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PropertiesValue.hasMany(models.ProductProperty, {
        foreignKey: "propertyValueId",
      });
      PropertiesValue.belongsTo(models.Property, {
        foreignKey: "propertyId",
      });
    }
  }
  PropertiesValue.init(
    {
      propertyId: DataTypes.INTEGER,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PropertiesValue",
      paranoid: true,
    }
  );
  return PropertiesValue;
};
