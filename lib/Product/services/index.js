const models = require("../../../models");
const Sequelize = require("sequelize");

const createProduct = async ({
  files,
  codeId,
  categoryId,
  storeId,
  title,
  discription,
  price,
  count,
  propertyId,
  propertyValueId,
}) => {
  let ProductProperties = [];
  const productPropertiesArray = async () => {
    for (let i = 0; i < propertyId.length; i++) {
      ProductProperties[i] = [];
      for (let j = 0; j < propertyId[i].length; j++) {
        ProductProperties[i].push({
          propertyId: propertyId[i][j],
          propertyValueId: propertyValueId[i][j],
        });
      }
    }
    return ProductProperties;
  };
  let ProductVariations = [];
  let productVariationPictures = [];
  const productVariationsArray = async () => {
    for (let i = 0; i < count.length; i++) {
      for (let j = 0; j < files.length; j++) {
        if (files[j].fieldname == `variationPictures[${i}]`) {
          productVariationPictures[i] = [];
          productVariationPictures[i].push({ url: files[j].filename });
        }
      }
      if (productVariationPictures[i]) {
        ProductVariations.push({
          price: price[i],
          count: count[i],
          Pictures: productVariationPictures[i],
          ProductProperties: ProductProperties[i],
        });
      } else {
        ProductVariations.push({
          price: price[i],
          count: count[i],
          ProductProperties: ProductProperties[i],
        });
      }
    }
    return ProductVariations;
  };
  let Pictures = [];
  const picturesArray = async () => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].fieldname === "pictures") {
        Pictures.push({ url: files[i].filename });
      }
    }
    return picturesArray;
  };
  await productPropertiesArray();
  await productVariationsArray();
  await picturesArray();
  const product = await models.Product.create(
    {
      codeId,
      categoryId,
      storeId,
      title,
      discription,
      ProductVariations,
      Pictures,
    },
    {
      include: [
        { model: models.Picture },
        {
          model: models.ProductVariation,
          include: [
            { model: models.Picture },
            { model: models.ProductProperty },
          ],
        },
      ],
    }
  );

  if (!product) return null;
  return product;
};

const getProductByPropertyValueId = async ({ propertyValueIds }) => {
  const products = await models.ProductProperty.findAll({
    where: {
      productId: {
        [Sequelize.Op.in]: propertyValueIds,
      },
    },
    include: [
      {
        model: models.Product,
        include: [
          { model: models.Picture },
          {
            model: models.ProductVariation,
            include: [{ model: models.Picture }],
          },
        ],
      },
    ],
  });
  if (products.length > 0) {
    return products;
  }
  return null;
};

const getAllProduct = async () => {
  const products = await models.Product.findAll({
    include: [
      { model: models.ProductProperty },
      { model: models.Picture },
      { model: models.ProductVariation, include: [{ model: models.Picture }] },
    ],
  });
  if (products.length > 0) {
    return products;
  }
  return null;
};

const getProductByProductCode = async ({ codeId }) => {
  const products = await models.Product.findAll({
    where: {
      codeId,
    },
    include: [
      { model: models.ProductProperty },
      { model: models.Picture },
      { model: models.ProductVariation, include: [{ model: models.Picture }] },
    ],
  });
  if (products.length > 0) {
    return products;
  }
  return null;
};

const getProductByStoreId = async ({ storeId }) => {
  const products = await models.Product.findAll({
    where: {
      storeId,
    },
    include: [
      { model: models.ProductProperty },
      { model: models.Picture },
      { model: models.ProductVariation, include: [{ model: models.Picture }] },
    ],
  });
  if (products.length > 0) {
    return products;
  }
  return null;
};

const getProductByTitle = async ({ title }) => {
  const products = await models.Product.findAll({
    where: {
      title: {
        [Sequelize.Op.like]: `%${title}%`,
      },
    },
    include: [
      { model: models.Picture },
      { model: models.ProductVariation, include: [{ model: models.Picture }] },
    ],
  });
  if (products.length > 0) {
    return products;
  }
  return null;
};

const getProductById = async ({ id }) => {
  const products = await models.Product.findOne({
    where: {
      id,
    },
    include: [
      { model: models.Picture },
      { model: models.ProductVariation, include: [{ model: models.Picture }] },
    ],
  });
  if (products) {
    return products;
  }
  return null;
};

const destroyProduct = async ({ product }) => {
  try {
    const deleteProduct = await product.destroy();
    if (deleteProduct) {
      return deleteProduct;
    }
    return null;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const updateProduct = async ({ codeId, title, discription, product }) => {
  const updated = await product.update({
    codeId,
    title,
    discription,
  });

  if (!updated) return null;
  return updated;
};

module.exports = {
  createProduct,
  getProductByPropertyValueId,
  getAllProduct,
  getProductByProductCode,
  getProductByStoreId,
  getProductByTitle,
  getProductById,
  destroyProduct,
  updateProduct,
};
