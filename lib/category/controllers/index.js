const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
const categoryServices = require("../services");

const create = async (req, res, next) => {
  try {
    const { name = "", parentId = null } = req.body;
    var parent ;
    var category;
    if (parentId) {
      parent = await getInstanceById(parentId, "Category");
    }
    if (parent || !parentId) {
      category = await categoryServices.createCategory({
        name,
        parentId,
      });
    }
    else {
      return response.failedWithMessage(
        "Main category id is not found !",
        req,
        res
      );
    }
    if (!category)
      return response.failedWithMessage(
        "this category already exist !",
        req,
        res
      );

    return response.successWithMessage("Category created successfully", res);
  } catch (err) {
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
};
