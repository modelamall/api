const response = require("../../responses");
const transformer = require("../transformers");
const {
  createCategory,
  getAllCategories,
  getCategoriesByParentId,
  deleteCategoryById,
  getParentsByCategory,
  getAllMainCategories
} = require("../services");

const create = async (req, res, next) => {
  try {
    const { name, parentId, filter } = req.body;
    const category = await createCategory({
      name,
      parentId,
      filter,
      files: req.files,
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

const getAllMain = async (req, res) => {
  try {
    const categories = await getAllMainCategories();
    if (!categories)
      return response.failedWithMessage("no categories!", req, res);
    return response.successWithMessage(" success", res, categories);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await getAllCategories();
    if (!categories)
      return response.failedWithMessage("no categories!", req, res);
      const transformeredCategory = transformer.categoriesTransformer(categories);
    return response.successWithMessage(" success", res, transformeredCategory);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

const getByParentId = async (req, res, next) => {
  try {
    const { parentId } = req.params;
    const categories = await getCategoriesByParentId(parentId);
    if (!categories)
      return response.failedWithMessage(
        "no main category has been found",
        req,
        res
      );
    if (!(categories.length > 0))
      return response.failedWithMessage(
        "no sub category has been found",
        req,
        res
      );
    return response.successWithMessage(" success", res, categories);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

const destroyCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteCategoryById(id);
    if (!deletedCategory)
      return response.failedWithMessage("failed to delete", req, res);
    return response.successWithMessage(deletedCategory, res);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

const getParentsByCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categories = await getParentsByCategory(id);
    if (!(categories.length > 0))
      return response.failedWithMessage(
        "Category not found",
        req,
        res
      );
    
    return response.successWithMessage(" success", res, categories);
  } catch (err) {
    console.log(err);
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
  getAll,
  getByParentId,
  destroyCategory,
  getParentsByCategoryId,
  getAllMain
};
