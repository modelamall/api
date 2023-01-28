const models = require("../../../models")


const createProduct = async ({ codeId, categoryId, storeId, title, discription, }) => {
    try {
      return await models.Product.create({
        codeId, categoryId, storeId, title, discription
      });
    } catch (err) {
      throw new Error(err);
    }
  };

const createProductVariation = async ({ size, price, count, productId, colorId }) => {
    try {
      return await models.ProductVariation.create({
        size, price, count, productId, colorId
      });
    } catch (err) {
      throw new Error(err);
    }
  };
  
module.exports = {
  createProduct,
  createProductVariation,
    
}