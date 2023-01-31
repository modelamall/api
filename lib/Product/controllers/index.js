const response = require("../../responses");
const productServices = require("../services");

const create = async (req, res, next) => {
  try {
    var {
      codeId,
      categoryId,
      title,
      discription,
      size,
      price,
      count,
      colorId,
      propertyIndex,
      propertyValue,
    } = req.body;
    const product = await productServices.createProduct({
      files: req.files,
      codeId,
      categoryId,
      storeId: req.user.id,
      title,
      discription,
      size,
      price,
      count,
      colorId,
      propertyId: propertyIndex,
      propertyValueId: propertyValue,
    });
    if (!product) {
      return response.failedWithMessage("can net created", req, res);
    }
    return response.successWithMessage("Product created successfully", res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

const getProductByPropertyValueId = async (req, res, next) => {
  try {
    const {propertyValueIds} = req.body
    const products = await productServices.getProductByPropertyValueId({ propertyValueIds });
    if (!products) {
      return response.serverError(req, res);
    }
    return response.successWithMessage("Successfully", res, products);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
  getProductByPropertyValueId,
};
