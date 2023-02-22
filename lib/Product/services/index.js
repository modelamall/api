const models = require("../../../models");
const Sequelize = require("sequelize");
const { sequelize } = require("../../../models");

const createProduct = async ({
  files,
  codeId,
  categoryId,
  storeId,
  title,
  description,
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
          if (productVariationPictures[i]) {
            productVariationPictures[i].push({ url: files[j].filename });
          } else {
            productVariationPictures[i] = [];
            productVariationPictures[i].push({ url: files[j].filename });
          }
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
      description,
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

const getProductsByIds = async (productsIds) => {
  const products = await models.Product.findAll({
    where: {
      id : {
        [Sequelize.Op.in]: productsIds
      },
    },
    attributes: ["id", "title", "description"],
    include: [
      { model: models.ProductCode, attributes: ["id", "code"] },
      { model: models.Category, attributes: ["id", "name", "parentId"] },
      { model: models.Store, attributes: ["id", "name"] },
      { model: models.Picture, attributes: ["id", "url", "alt"] },
      {
        model: models.ProductVariation,
        attributes: ["id", "price", "count"],
        include: [
          { model: models.Picture, attributes: ["id", "url", "alt"] },
          {
            model: models.ProductProperty,
            attributes: ["id"],
            include: [
              { model: models.Property, attributes: ["id", "type"] },
              { model: models.PropertiesValue, attributes: ["id", "value"] },
            ],
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

const getProductByPropertyValueId = async ({
  propertyValues,
  properties,
  maxPrice,
  minPrice,
  categorytId,
}) => {
  var priceQuery = "1=1 ";
  if (maxPrice) {
    priceQuery += `AND (price <=  ${maxPrice})`;
  }
  if (minPrice) {
    priceQuery += `AND (price >= ${minPrice})`;
  }
  const where = [];
  if (propertyValues.length > 0) {
    propertyValues.map((item, i) => {
      where.push(`
      EXISTS(
        SELECT
            *
        FROM
            productProperties
        WHERE
            productVariations.id = productProperties.productVariationId
            AND propertyId = ${properties[i]}
            AND propertyValueId IN(${item})
    )`);
    });
  } else where.push("1=1 ");
  const query = `
  SELECT
    id
FROM
    products
WHERE
    categoryId IN (
      WITH RECURSIVE CategoryCTE AS (
        SELECT id, name, parentId
        FROM Categories
        WHERE id = ${categorytId}
      
        UNION ALL
      
        SELECT c.id, c.name, c.parentId
        FROM Categories c
        INNER JOIN CategoryCTE pc ON pc.id = c.parentId
      )
      SELECT id
      FROM CategoryCTE
    )
    AND EXISTS(
        SELECT
            *
        FROM
            productVariations
        WHERE
            products.id = productVariations.productId
            AND deletedAt IS NULL
            AND(
              ${priceQuery} 
                AND ${where.join(" AND ")}
            )
    );
  `;
  const [products, x] = await sequelize.query(query);
  if (products.length > 0) {
    const productsIds = products.map((product)=> product.id)
    const productsData = await getProductsByIds(productsIds)
    return productsData;
  }
  return null;
};

const getAllProduct = async () => {
  const products = await models.Product.findAll({
    attributes: ["id", "title", "description"],
    include: [
      { model: models.ProductCode, attributes: ["id", "code"] },
      { model: models.Category, attributes: ["id", "name", "parentId"] },
      { model: models.Store, attributes: ["id", "name"] },
      { model: models.Picture, attributes: ["id", "url", "alt"] },
      {
        model: models.ProductVariation,
        attributes: ["id", "price", "count"],
        include: [
          { model: models.Picture, attributes: ["id", "url", "alt"] },
          {
            model: models.ProductProperty,
            attributes: ["id"],
            include: [
              { model: models.Property, attributes: ["id", "type"] },
              { model: models.PropertiesValue, attributes: ["id", "value"] },
            ],
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
      { model: models.Picture },
      {
        model: models.ProductVariation,
        include: [{ model: models.Picture }, { model: models.ProductProperty }],
      },
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
    attributes: ["id", "title", "description"],
    include: [
      { model: models.ProductCode, attributes: ["id", "code"] },
      { model: models.Category, attributes: ["id", "name", "parentId"] },
      { model: models.Store, attributes: ["id", "name"] },
      { model: models.Picture, attributes: ["id", "url", "alt"] },
      {
        model: models.ProductVariation,
        attributes: ["id", "price", "count"],
        include: [
          { model: models.Picture, attributes: ["id", "url", "alt"] },
          {
            model: models.ProductProperty,
            attributes: ["id"],
            include: [
              { model: models.Property, attributes: ["id", "type"] },
              { model: models.PropertiesValue, attributes: ["id", "value"] },
            ],
          },
        ],
      },
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

const updateProduct = async ({ codeId, title, description, product }) => {
  const updated = await product.update({
    codeId,
    title,
    description,
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
