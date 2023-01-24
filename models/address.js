'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    cityid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    address: DataTypes.TEXT,
    postcode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
    paranoid:true
  });
  return Address;
};