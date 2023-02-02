const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
const productVariationServices = require("../services");

const create = async (req, res, next) => {
  try {
    const { size, price, count, colorId, productId } = req.body;
    const productVariation =
      await productVariationServices.createProductVariation({
        size,
        price,
        count,
        colorId,
        productId,
        files: req.files,
      });
    if (!productVariation) {
      return response.failedWithMessage(
        "Product variation not created successfully !",
        req,
        res
      );
    }
    return response.successWithMessage(
      "Product variation created successfully",
      res
    );
  } catch (err) {
    return response.serverError(req, res);
  }
};

const getByProductId = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const productVariation = await productVariationServices.getByProductId({
      id,
    });
    if (!productVariation) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, productVariation);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const productVariation = await productVariationServices.getById({ id });
    if (!productVariation) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, productVariation);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const deleteProductVariation = async (req, res, next) => {
  const id = req.body.productVariationId;
  const productVariation = await getInstanceById(id, "ProductVariation");
  const deleted = await productVariationServices.destroyProductVariation({
    productVariation,
  });
  if (deleted) {
    return response.successWithMessage(
      "Product Variation deleted successfully",
      res
    );
  }
  return response.serverError(req, res);
};

const updateProductVariation = async (req, res, next) => {
  try {
    var { size, price, count, colorId, productVariationId } = req.body;
    const productVariation = await getInstanceById(productVariationId, "ProductVariation");
    const updated = await productVariationServices.updateProductVariation({
      productVariation,
      size,
      price,
      count,
      colorId,
    });
    if (!updated) {
      return response.failedWithMessage("can net updated", req, res);
    }
    return response.successWithMessage("Product Variation update successfully", res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
  getByProductId,
  getById,
  deleteProductVariation,
  updateProductVariation,
};
