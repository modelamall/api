const response = require("../../responses");
const categoryServices = require("../services");

const create = async (req, res, next) => {
  try {
    const { name, parentId, filter} = req.body;
    const category = await categoryServices.createCategory({
        name,
        parentId,
        filter
      });
    
    if (!category)
      return response.failedWithMessage(
        "this category already exist !",
        req,
        res
      );

    return response.successWithMessage("Category created successfully", res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
};
