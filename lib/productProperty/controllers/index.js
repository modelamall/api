const productPropertyServices = require("../services");
const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
const models = require("../../../models");

const addProductProperty = async (req, res, next) => {
  try {
    const { propertyId, propertyValueId, productVariationId } = req.body;
    const productProperty = await productPropertyServices.createProductProperty(
      { propertyId, propertyValueId, productVariationId }
    );
    if (!productProperty) {
      return response.failedWithMessage(
        "Product Property already exist",
        req,
        res
      );
    }
    return response.successWithMessage(
      "Product Property created successfully",
      res
    );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};
const deleteProductProperty = async (req, res, next) => {
  const id = +req.params.id;
  const productProperty = await getInstanceById(id, "ProductProperty");
  if (productProperty) {
    const deleted = await productPropertyServices.destroyProductProperty({ productProperty });
    if (deleted) {
      return response.successWithMessage("product Property deleted successfully", res);
    }
    return response.serverError(req, res);
  }
  return response.failedWithMessage("product Property id is not found", req, res);
};

const updateProductProperty = async (req, res, next) => {
  try {
    const { propertyId, propertyValueId } = req.body;
    const id = +req.params.id;
    const productProperty = await getInstanceById(id, "ProductProperty");
    if (productProperty) {
        const updatedProductProperty = await productPropertyServices.updateProductProperty({productProperty, propertyId, propertyValueId });
        if (updatedProductProperty) {
          return response.successWithMessage(
            "product Property update successfully",
            res,
            updatedProductProperty
          );
        } else return response.serverError(req, res);
    } else return response.failedWithMessage("product Property id is not found", req, res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

module.exports = {
  addProductProperty,
  updateProductProperty,
  deleteProductProperty,
}
