const  {createCity, destroyCity, getAllCities, getCitiesByProvinceId, updateCity} = require('../services');
const response = require('../../responses');
const { getInstanceById } = require('../../sevices/modelService');

const addCity = async (req, res, next) => {
  try {
    const {name, provinceId} = req.body;
    const province = await getInstanceById(provinceId, "Province");
      if (province) {
    const city = await createCity ({name, provinceId})
    if (!city) {
      return response.failedWithMessage('city already exist',req, res) 
    }
    return response.successWithMessage("city created successfully", res);
}
   return response.failedWithMessage("this province id is not found !", req, res);
} catch (err) {
  console.log("ERROR--> ", err);
  return response.serverError(req, res);
}
}

const update = async (req, res, next) => {
  try {
  const { id, name, provinceId } = req.body;
  const updatedCity = await updateCity({ id, name, provinceId });
  return response.successWithMessage(updatedCity, res);
  } catch (err) {
  console.log("ERROR: ", err);
  return response.failedWithMessage(err.message, req, res);
  }
  }

const destroy = async (req, res) => {
  try {
      const id = req.params.id;
      await destroyCity(id);
      return response.successWithMessage({ message: "City deleted successfully" }, res);
  } catch (err) {
      console.log("ERROR: ", err);
      return response.failedWithMessage(err.message, req, res);
  }
};

const getAll = async (req, res, next) => {
  try {
    const cities = await getAllCities();
    if (!cities || cities.length === 0) {
      return response.failedWithMessage("No cities found", req, res);
  }
    return response.successWithMessage(cities, res);
  } catch (err) {
    console.log("ERROR: ", err);
    return response.serverError(req, res);
  }
}

const getByProvinceId = async (req, res, next) => {
  try {
    const provinceId = req.params.provinceId;
    const cities = await getCitiesByProvinceId(provinceId);
    if (!cities || cities.length === 0) {
      return response.failedWithMessage("No cities found for this provinceId", req, res);
    }
    return response.successWithMessage("Successfully", res ,cities);
  } catch (err) {
    console.log("ERROR: ", err);
    return response.serverError(req, res);
  }
}

module.exports = {
    addCity,
    update,
    destroy,
    getAll,
    getByProvinceId
}