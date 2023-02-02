const models = require("../../../models");

const createProductVariation = async ({
  size,
  price,
  count,
  productId,
  colorId,
  files,
}) => {
  try {
    const Pictures = [];
    const picturesArray = async () => {
      for (let i = 0; i < files.length; i++) {
        Pictures.push({
          url: files[i].filename,
        });
      }
    };
    await picturesArray();
    const create = await models.ProductVariation.create(
      {
        size,
        price,
        count,
        productId,
        colorId,
        Pictures,
      },
      {
        include: [{ model: models.Picture }],
      }
    );
    if (create) {
      return create;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const getByProductId = async ({ id }) => {
  const productVariations = await models.ProductVariation.findAll({
    where: {
      id,
    },
    include: [{ model: models.Picture }],
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
    include: [{ model: models.Picture }],
  });
  if (productVariation) {
    return productVariation;
  }
  return null;
};

const destroyProductVariation = async ({ productVariation }) => {
  try {
    const deleteProductVariation = await productVariation.destroy();
    if (deleteProductVariation) {
      return deleteProductVariation;
    }
    return null;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const updateProductVariation = async ({
  productVariation,
  size,
  price,
  count,
  colorId,
}) => {
  const updated = await productVariation.update({
    size,
    price,
    count,
    colorId,
  });

  if (!updated) return null;
  return updated;
};

module.exports = {
  createProductVariation,
  getByProductId,
  getById,
  destroyProductVariation,
  updateProductVariation,
};
