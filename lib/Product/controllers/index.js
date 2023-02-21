const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
const productServices = require("../services");
const transformer = require("../transformers");

const create = async (req, res, next) => {
  try {
    var {
      codeId,
      categoryId,
      title,
      description,
      price,
      count,
      propertyIndex,
      propertyValue,
    } = req.body;
    const product = await productServices.createProduct({
      files: req.files,
      codeId,
      categoryId,
      storeId: req.user.id,
      title,
      description,
      price,
      count,
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
    var properties = Object.keys(req.body)
    properties = properties.filter((property)=> property.startsWith("op_"))
    const propertyValues = []
    properties.map((property)=>{
      const value = req.body[property]
      propertyValues.push(value)
    })
    console.log(propertyValues);
    const { maxPrice, minPrice, categorytId } = req.body;
    const products = await productServices.getProductByPropertyValueId({
      maxPrice,
      minPrice,
      categorytId,
    });
    if (!products) {
      return response.failedWithMessage("Not found !", req, res);
    }
    const transformeredProducts = transformer.productsTransformer(products);
    return response.successWithMessage("Successfully", res, transformeredProducts);
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
    const transformeredProducts = transformer.productsTransformer(products);
    return response.successWithMessage(
      "Successfully",
      res,
      transformeredProducts
    );
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
    const storeId = req?.storeId ? req?.storeId : req.user.id;
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
    const id = +req.params.id;
    const product = await productServices.getProductById({ id });
    if (!product) {
      return response.failedWithMessage("Not found !", req, res);
    }
    const transformeredProduct = transformer.productTransformer(product);
    return response.successWithMessage(
      "Successfully",
      res,
      transformeredProduct
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.body.productId;
  const product = await getInstanceById(id, "Product");
  const deleted = await productServices.destroyProduct({ product });
  if (deleted) {
    return response.successWithMessage("Product deleted successfully", res);
  }
  return response.serverError(req, res);
};

const updateProduct = async (req, res, next) => {
  try {
    var { codeId, title, description, productId } = req.body;
    const product = await getInstanceById(productId, "Product");
    const updated = await productServices.updateProduct({
      product,
      codeId,
      title,
      description,
    });
    if (!updated) {
      return response.failedWithMessage("can net updated", req, res);
    }
    return response.successWithMessage("Product update successfully", res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
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
  updateProduct,
};
