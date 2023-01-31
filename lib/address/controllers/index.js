const response = require('../../responses');
const { getInstanceById } = require('../../sevices/modelService');
const { createAddress } = require('../services');


const addAddress = async (req, res, next) => {
    try {
      const {cityId,address,title,postCode} = req.body;
      const id = req.user.id
      const type = req.user.type
      const city = await getInstanceById(cityId, "City");
        if (city) {
      const Address = await createAddress ({id, type, cityId,address,title,postCode})
      return response.successWithMessage("address created successfully", res);
  }
     return response.failedWithMessage("this city id is not found !", req, res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
  }

  module.exports={
    addAddress
  }