"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Picture.belongsTo(models.ProductVariation, {
        foreignKey: "pictureableId",
        constraints: false
      });
      Picture.belongsTo(models.Product, {
        foreignKey: "pictureableId",
        constraints: false
      });
    }
  }
  Picture.init(
    {
      url: DataTypes.STRING,
      alt: DataTypes.STRING,
      pictureableId: DataTypes.INTEGER,
      pictureableType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Picture",
      paranoid: true,
    }
  );

  Picture.addHook("afterFind", findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance?.pictureableType === "Product" && instance.Product !== undefined) {
        instance.pictureable = instance.Product;
      } else if (instance?.pictureableType === "ProductVariation" && instance.ProductVariation !== undefined) {
        instance.pictureable = instance.ProductVariation;
      }
      // To prevent mistakes:
      delete instance?.Product;
      delete instance?.dataValues.Product;
      delete instance?.ProductVariation;
      delete instance?.dataValues.ProductVariation;
    }
  });
  return Picture;
};
