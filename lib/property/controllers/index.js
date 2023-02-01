const response = require('../../responses');
const { createProperty, updateProperty, deleteProperty, getAllProperties } = require('../services');

const addProperty = async (req, res, next) => {
  try {
    const {type} = req.body;
    const property = await createProperty ({type})
    if (!property)
    return response.failedWithMessage("this property already exist !", req, res);
  return response.successWithMessage("property created successfully", res);
} catch (err) {
  console.log("ERROR--> ", err);
  return response.serverError(req, res);
}}

const update = async (req, res) => {
    try {
      const { type } = req.body;
      const updatedProperty = await updateProperty (req.params.id, type);
      if (!updatedProperty) {
        return response.failedWithMessage("Property not found", req, res);
      }
      return response.successWithMessage(updatedProperty, res);
    } catch (err) {
      console.log("ERROR--> ", err);
      return response.serverError(req, res);
    }
  }

const destroy = async (req, res) => {
    try {

        const deletedProperty = await deleteProperty (req.params.id);
        if (!deletedProperty) {
            return response.failedWithMessage("Property not found", req, res);
        }
        return response.successWithMessage("Property deleted",res);
    } catch (err) {
        console.log("ERROR--> ", err);
        return response.serverError(req, res);
    }
  }

const getAll = async (req, res) => {
    try {
        const properties = await getAllProperties ();
        if (!properties || properties.length === 0) {
            return response.failedWithMessage("No properties found", req, res);
        }
        return response.successWithMessage(properties, res);
    } catch (err) {
        console.log("ERROR--> ", err);
        return response.serverError(req, res);
    }
  }
module.exports = {
    addProperty,
    update,
    destroy,
    getAll
}