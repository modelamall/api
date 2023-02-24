const response = require("../../responses");
const {
  createPropertyValue,
  updatePropertyValue,
  deletePropertyValue,
  getAllPropertyValues
} = require("../services");

const addPropertyValue = async (req, res, next) => {
  try {
    const { value, propertyId } = req.body;
    const propertyValue = await createPropertyValue({ value, propertyId });
    if (!propertyValue)
      return response.failedWithMessage(
        "this propertyValue already exist !",
        req,
        res
      );
    return response.successWithMessage("Property Value created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const update = async (req, res) => {
  try {
    const { value } = req.body;
    const updatedPropertyValue = await updatePropertyValue(req.params.id, value);
    if (!updatedPropertyValue) {
      return response.failedWithMessage("Property Value not found", req, res);
    }
    return response.successWithMessage("successfull", res, updatedPropertyValue);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const destroy = async (req, res) => {
  try {
    const deletedPropertyValue = await deletePropertyValue(req.params.id);
    if (!deletedPropertyValue) {
      return response.failedWithMessage("Property Value not found", req, res);
    }
    return response.successWithMessage("Property Value deleted", res);
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
    const propertyValues = await getAllPropertyValues({paranoid});
    if (!propertyValues || propertyValues.length === 0) {
      return response.failedWithMessage("No Property Values found", req, res);
    }
    return response.successWithMessage("successfull", res, propertyValues);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

module.exports = {
  addPropertyValue,
  update,
  destroy,
  getAll
};
