"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.hasMany(models.PropertiesValue, {
        foreignKey: "propertyId",
      });
      Property.hasMany(models.ProductProperty, {
        foreignKey: "propertyId",
      });
      Property.hasMany(models.Filter, {
        foreignKey: "propertyId",
      });
    }
  }
  Property.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Property",
      paranoid: true,
    }
  );
  return Property;
};
