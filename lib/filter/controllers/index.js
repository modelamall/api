const filterServices = require("../services");
const response = require("../../responses");

const getFilterByCategoryId = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const filter = await filterServices.getFilter({id});
    if (!filter) {
      return response.failedWithMessage("Filter id is not found", req, res);
    }
    return response.successWithMessage("Successfully", res, filter);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};


module.exports = {
  getFilterByCategoryId,
};
