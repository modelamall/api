'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.hasOne(models.Address, {
        foreignKey: "addressableId",
        constraints: false,
        scope: {
          addressableType: "Store",
        },
      });
      Store.hasMany(models.Product, {
        foreignKey: "storeId",
      });
    }
  }
  Store.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    logo: DataTypes.STRING,
    banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
    paranoid: true,
  });
  return Store;
};