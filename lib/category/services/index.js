const models = require("../../../models");
const { Op } = require("sequelize");

const createCategory = async ({ name, parentId, filter }) => {
  try {
    const Filters = [];
    const filterArray = async () => {
      for (let i = 0; i < filter.length; i++) {
        Filters.push({
          propertyId: filter[i],
        });
      }
    };
    await filterArray();
    const [category, created] = await models.Category.findOrCreate({
      where: {
        [Op.and]: [{ name }, { parentId }, { deletedAt: null }],
      },
      defaults: {
        name,
        parentId,
        Filters,
      },
      include: [{ model: models.Filter }],
    });
    if (!created) return null;
    return category;
  } catch (err) {
    throw new Error(err);
  }
}

const getAllCategories = async () => {
  try {
    const categories = await models.Category.findAll({
      where: {
        deletedAt: null,
      },
      include: [{ model: models.Filter }],
    });
    return categories;
  } catch (err) {
    throw new Error(err);
  }
}

const getCategoriesByParentId = async (parentId) => {
  try {
    const categories = await models.Category.findAll({
      where: {
        parentId,
        deletedAt: null
      }
    });
    return categories;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteCategoryById = async (id) => {
  try {
    const deletedCategory = await models.Category.update({ deletedAt: new Date() }, {
      where: {
        id
      }
    });
    return deletedCategory;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoriesByParentId,
  deleteCategoryById
};
