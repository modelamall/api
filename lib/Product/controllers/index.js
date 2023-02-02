const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
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
    const { propertyValueIds } = req.body;
    const products = await productServices.getProductByPropertyValueId({
      propertyValueIds,
    });
    if (!products) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, products);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await productServices.getAllProduct();
    if (!products) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, products);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getProductByProductCode = async (req, res, next) => {
  try {
    const products = await productServices.getProductByProductCode({
      codeId: req.productCodeId,
    });
    if (!products) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, products);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getProductByStoreId = async (req, res, next) => {
  try {
    const storeId = req.storeId;
    const products = await productServices.getProductByStoreId({ storeId });
    if (!products) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, products);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getProductByTitle = async (req, res, next) => {
  try {
    const title = req.params.text;
    const products = await productServices.getProductByTitle({ title });
    if (!products) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, products);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = +req.params.text;
    const product = await productServices.getProductById({ id });
    if (!product) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, product);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.body.productId;
  const product = await getInstanceById(id, "Product")
  const deleted = await productServices.destroyProduct({ product });
  if (deleted) {
    return response.successWithMessage("Product deleted successfully", res);
  }
  return response.serverError(req, res);
};

module.exports = {
  create,
  getProductByPropertyValueId,
  getAllProduct,
  getProductByProductCode,
  getProductByStoreId,
  getProductByTitle,
  getProductById,
  deleteProduct,
};
