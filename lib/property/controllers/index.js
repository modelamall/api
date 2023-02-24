const response = require("../../responses");
const {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getAllNotBoundByCategory
} = require("../services");

const addProperty = async (req, res, next) => {
  try {
    const { type } = req.body;
    const property = await createProperty({ type });
    if (!property)
      return response.failedWithMessage(
        "this property already exist !",
        req,
        res
      );
    return response.successWithMessage("property created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const update = async (req, res) => {
  try {
    const { type } = req.body;
    const updatedProperty = await updateProperty(req.params.id, type);
    if (!updatedProperty) {
      return response.failedWithMessage("Property not found", req, res);
    }
    return response.successWithMessage("successfull", res, updatedProperty);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const deletedProperty = await deleteProperty(req.params.id);
    if (!deletedProperty) {
      return response.failedWithMessage("Property not found", req, res);
    }
    return response.successWithMessage("Property deleted", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getAll = async (req, res) => {
  try {
    let paranoid = true
    if (req.user.type == "Admin") {
      paranoid = false
    }
    const properties = await getAllProperties({paranoid});
    if (!properties || properties.length === 0) {
      return response.failedWithMessage("No properties found", req, res);
    }
    return response.successWithMessage("successfull", res, properties);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getAllNotBoundByCategoryId = async (req, res) => {
  try {
    const {ids} = req.body
    const properties = await getAllNotBoundByCategory(ids);
    if (!properties || properties.length === 0) {
      return response.failedWithMessage("No properties found", req, res);
    }
    return response.successWithMessage("successfull", res, properties);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};
module.exports = {
  addProperty,
  update,
  destroy,
  getAll,
  getAllNotBoundByCategoryId,
};
