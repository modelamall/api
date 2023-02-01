const models = require("../../../models");

const createProduct = async ({
  codeId,
  categoryId,
  storeId,
  title,
  discription,
}) => {
  try {
    return await models.Product.create({
      codeId,
      categoryId,
      storeId,
      title,
      discription,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createProductVariation = async ({
  size,
  price,
  count,
  productId,
  colorId,
}) => {
  try {
    return await models.ProductVariation.create({
      size,
      price,
      count,
      productId,
      colorId,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const getByProductId = async ({ id }) => {
  const productVariations = await models.ProductVariation.findAll({
    where: {
      id,
    },
    include: [{ model: models.Picture }]
  });
  if (productVariations.length > 0) {
    return productVariations;
  }
  return null;
};

const getById = async ({ id }) => {
  const productVariation = await models.ProductVariation.findOne({
    where: {
      id,
    },
    include: [{ model: models.Picture }]
  });
  if (productVariation) {
    return productVariation;
  }
  return null;
};

module.exports = {
  createProduct,
  createProductVariation,
  getByProductId,
  getById,
};
