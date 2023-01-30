const models = require("../../../models");
const Sequelize = require("sequelize");
// const sequelize = new Sequelize("modelamall", "root", "12345678", {
//   host: "localhost",
//   dialect: "mysql",
// });

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
  console.log(
    codeId,
    categoryId,
    storeId,
    title,
    discription,
    size,
    price,
    count,
    colorId
  );
  // const product = await models.Product.create({
  //   codeId,
  //   categoryId,
  //   storeId,
  //   title,
  //   discription,
  //   ProductVariation: { size: size[0], price: price[0], count: count[0], colorId: colorId[0] },
  // },
  // include: {
  //   model: models.ProductVariation
  // }
  // );
  const x = ()=>{
    for (let i = 0; i < count.length; i++) {
      `{
        size: size[${i}],
        price: price[${i}],
        count: count[${i}],
        colorId: colorId[${i}],
      },`
    }
  }
  console.log(x());
  const product = await models.Product.create(
    {
      codeId,
      categoryId,
      storeId,
      title,
      discription,
      ProductVariations: [
        x(),
        ],
    },
    {
      include: [{ model: models.ProductVariation}],
    }
  );

  if (!product) return null;
  return product;

  // const product = await models.Product.create({
  //   codeId,
  //   categoryId,
  //   storeId,
  //   title,
  //   discription,
  //   ProductVariation:{
  //     size: size[0],
  //     price: price[0],
  //     count: count[0],
  //     colorId: colorId[0],
  //     productId: product.id
  //   }
  // }).then(product => {
  //   return models.ProductVariation.create({
  //     size: size[0],
  //     price: price[0],
  //     count: count[0],
  //     colorId: colorId[0],
  //     productId: product.id
  //   })
  // }).catch(error => {
  //   // error
  //   return null;
  // })
  // return product;

  // const transaction = await sequelize.transaction();
  // try {
  //   cç
  //     { codeId, categoryId, storeId, title, discription },
  //     { transaction }
  //   );
  //   const productVariation = await models.ProductVariation.create(
  //     { size, price, count, productId: product.id, colorId },
  //     { transaction }
  //   );
  //   const pictures = [];
  //   const x = req.files.map(async (picture) => {
  //     pictures.push(
  //       await models.Picture.create(
  //         { url: picture.filename, productVariationId: product.id },
  //         { transaction }
  //       )
  //     );
  //   });
  //   await transaction.commit();
  //   return { product, productVariation, pictures };
  // } catch (error) {
  //   await transaction.rollback();
  //   return false;
  // }
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
