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
      title: DataTypes.STRING,
      address: DataTypes.TEXT,
      postcode: DataTypes.INTEGER,
      addressableId:DataTypes.INTEGER,
      addressableType:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Address",
      paranoid: true,
    }
  );
  Address.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.addressableType === "User" && instance.User !== undefined) {
        instance.Addressable = instance.User;
      } else if (instance.addressableType === "Admin" && instance.Admin !== undefined) {
        instance.Addressable = instance.Admin;
      }else if(instance.addressableType === "Store" && instance.Store !== undefined){
        instance.Addressable = instance.Stroe;
      }
      // To prevent mistakes:
      delete instance.User;
      delete instance.dataValues.User;
      delete instance.Admin;
      delete instance.dataValues.Admin;
      delete instance.Store;
      delete instance.dataValues.Store;
    }
  });
  return Address;
};
