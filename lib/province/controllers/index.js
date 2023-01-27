const  {createProvince} = require('../services');
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
};

module.exports = {
    addProvince,
}