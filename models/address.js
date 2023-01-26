"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.City, {
        foreignKey: "cityId",
      });
      Address.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });
      Address.belongsTo(models.Admin, {
        foreignKey: "userId",
        as: "Admin",
      });
      Address.belongsTo(models.Store, {
        foreignKey: "userId",
        as: "Store",
      });
    }
  }
  Address.init(
    {
      cityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      address: DataTypes.TEXT,
      postcode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address",
      paranoid: true,
    }
  );
  return Address;
};
