const response = require("../../responses");
const {createCategory, getAllCategories, getCategoriesByParentId, deleteCategoryById} = require ('../services')


const create = async (req, res, next) => {
  try {
    const { name, parentId, filter} = req.body;
    const category = await createCategory ({
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
}

const getAll = async (req, res) => {
  try {
    const categories = await getAllCategories ();
    if (!categories)
    return response.failedWithMessage(
      "no categories!",
      req,
      res
    )
    return response.successWithMessage(categories, res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
}

const getByParentId = async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const categories = await getCategoriesByParentId (parentId)
    if (!categories)
    return response.failedWithMessage(
      "no main category has been found",
      req,
      res
    )
    return response.successWithMessage(categories, res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

const destroyCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteCategoryById (id);
    if (!deletedCategory)
    return response.failedWithMessage(
      "failed to delete",
      req,
      res
    )
    return response.successWithMessage(deletedCategory, res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};


module.exports = {
  create,
  getAll,
  getByParentId,
  destroyCategory
};
