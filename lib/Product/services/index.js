const models = require("../../../models");
const Sequelize = require("sequelize");

const createProduct = async ({
  files,
  codeId,
  categoryId,
  storeId,
  title,
  discription,
  size,
  price,
  count,
  colorId,
  propertyId,
  propertyValueId,
}) => {
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
          size: size[i],
          price: price[i],
          count: count[i],
          colorId: colorId[i],
          Pictures: productVariationPictures[i],
        });
      } else {
        ProductVariations.push({
          size: size[i],
          price: price[i],
          count: count[i],
          colorId: colorId[i],
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
  let ProductProperties = [];
  const productPropertiesArray = async () => {
    for (let i = 0; i < propertyId.length; i++) {
      ProductProperties.push({
        propertyId: propertyId[i],
        propertyValueId: propertyValueId[i],
      });
    }
    return ProductProperties;
  };
  await productVariationsArray();
  await picturesArray();
  await productPropertiesArray();
  const product = await models.Product.create(
    {
      codeId,
      categoryId,
      storeId,
      title,
      discription,
      ProductVariations,
      Pictures,
      ProductProperties,
    },
    {
      include: [
        { model: models.Picture },
        {
          model: models.ProductVariation,
          include: [{ model: models.Picture }],
        },
        { model: models.ProductProperty },
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
      { model: models.Product, include: [{ model: models.Picture }, { model: models.ProductVariation, include: [{ model: models.Picture}]}] }
    ],
  });
  if (products.length > 0) {
    return products;
  }
  return null;
};

module.exports = {
  createProduct,
  getProductByPropertyValueId,
};
