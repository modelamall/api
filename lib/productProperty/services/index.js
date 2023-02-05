const { Op } = require("sequelize");
const models = require("../../../models");

const createProductProperty = async ({
  propertyId,
  propertyValueId,
  productVariationId,
}) => {
  try {
    const [productProperty, created] =
      await models.ProductProperty.findOrCreate({
        where: {
          [Op.and]: [
            { propertyId },
            { productVariationId },
            { deletedAt: null },
          ],
        },
        defaults: {
          propertyId,
          propertyValueId,
          productVariationId,
        },
      });
    if (!created) return null;
    return productProperty;
  } catch (err) {
    throw new Error(err);
  }
};

const getProductPropertyByProductId = async () => {
  const productPropertys = await models.ProductProperty.findAll();
  if (productPropertys.length > 0) {
    return productPropertys;
  }
  return null;
};

const updateProductProperty = async ({
  productProperty,
  propertyId,
  propertyValueId,
}) => {
  try {
    const updatedProductProperty = await productProperty.update({
      propertyId,
      propertyValueId,
    });
    if (updatedProductProperty) {
      return updatedProductProperty;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

const destroyProductProperty = async ({ productProperty }) => {
  try {
    const deleteProductProperty = await productProperty.destroy();
    if (deleteProductProperty) {
      return deleteProductProperty;
    }
    return null;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  createProductProperty,
  getProductPropertyByProductId,
  updateProductProperty,
  destroyProductProperty,
};
