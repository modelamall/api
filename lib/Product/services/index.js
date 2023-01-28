const models = require("../../../models");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("modelamall", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

// const createProduct = async ({ codeId, categoryId, storeId, title, discription, }) => {
//     try {
//       console.log(codeId, categoryId, storeId, title, discription,);
//       const x = await models.Product.create({
//         codeId, categoryId, storeId, title, discription
//       });
//       console.log("1234");
//       return x
//     } catch (err) {
//       throw new Error(err);
//     }
//   };

const createProduct = async ({
  codeId,
  categoryId,
  storeId,
  title,
  discription,
  size,
  price,
  count,
  colorId,
}) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await models.Product.create(
      { codeId, categoryId, storeId, title, discription },
      { transaction }
    );
    const productVariation = await models.ProductVariation.create(
      { size, price, count, productId: product.id, colorId },
      { transaction }
    );
    await transaction.commit();
    return { product, productVariation };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return false
  }
};

// const createProductVariation = async ({ size, price, count, productId, colorId }) => {
//     try {
//       return await models.ProductVariation.create({
//         size, price, count, productId, colorId
//       });
//     } catch (err) {
//       throw new Error(err);
//     }
//   };

module.exports = {
  createProduct,
  // createProductVariation,
};
