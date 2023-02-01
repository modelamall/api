const  {createProvince, updateProvince, deleteProvince, getAllProvinces} = require('../services');
const response = require('../../responses')

const addProvince = async (req, res, next) => {
  try {
    const {name} = req.body;
    const province = await createProvince ({name})
    if (!province)
    return response.failedWithMessage("this province already exist !", req, res);
  return response.successWithMessage("province created successfully", res);
} catch (err) {
  console.log("ERROR--> ", err);
  return response.serverError(req, res);
}
}

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedProvince = await updateProvince(req.params.id, name);
    if (!updatedProvince) {
      return response.failedWithMessage("Province not found", req, res);
    }
    return response.successWithMessage(updatedProvince, res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
}

const destroy = async (req, res) => {
  try {
      const deletedProvince = await deleteProvince (req.params.id);
      if (!deletedProvince) {
          return response.failedWithMessage("Province not found", req, res);
      }
      return response.successWithMessage("Province deleted",res);
  } catch (err) {
      console.log("ERROR--> ", err);
      return response.serverError(req, res);
  }
}

const getAll = async (req, res) => {
  try {
      const provinces = await getAllProvinces ();
      if (!provinces || provinces.length === 0) {
          return response.failedWithMessage("No provinces found", req, res);
      }
      return response.successWithMessage(provinces, res);
  } catch (err) {
      console.log("ERROR--> ", err);
      return response.serverError(req, res);
  }
}

module.exports = {
    addProvince,
    update,
    destroy,
    getAll

}