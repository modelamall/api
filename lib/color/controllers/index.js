const response = require("../../responses");
const productCodeServices = require("../services");

const create = async (req, res, next) => {
  try {
    const { code } = req.body;
   
     const productCode = await productCodeServices.createProductCode({
        code,
      });
    
    if (!productCode)
      return response.failedWithMessage(
        "this code already exist !",
        req,
        res
      );

    return response.successWithMessage("Code created successfully", res);
  } catch (err) {
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
};