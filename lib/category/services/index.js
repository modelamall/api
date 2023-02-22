const models = require("../../../models");
const { Op } = require("sequelize");
const { sequelize } = require("../../../models");

const createCategory = async ({ name, parentId, filter, files }) => {
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
        icon: files[0],
      },
      include: [{ model: models.Filter }],
    });
    if (!created) return null;
    return category;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await models.Category.findAll({
      where: {
        parentId: null,
      },
      include: [{ model: models.Category, as: `sub` }],
    });
    return categories;
  } catch (err) {
    throw new Error(err);
  }
};

const getCategoriesByParentId = async (parentId) => {
  try {
    const categories = await models.Category.findAll({
      where: {
        parentId,
        deletedAt: null,
      },
    });
    return categories;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCategoryById = async (id) => {
  try {
    const deletedCategory = await models.Category.update(
      { deletedAt: new Date() },
      {
        where: {
          id,
        },
      }
    );
    return deletedCategory;
  } catch (err) {
    throw new Error(err);
  }
};

const getParentsByCategory = async (id) => {
  try {
    const query = `WITH RECURSIVE CategoryCTE AS (
      SELECT id, name, parentId
      FROM Categories
      WHERE id = ${id} 
    
      UNION ALL
    
      SELECT c.id, c.name, c.parentId
      FROM Categories c
      INNER JOIN CategoryCTE pc ON pc.parentId = c.id
    )
    SELECT DISTINCT id, name, parentId
    FROM CategoryCTE
    ORDER BY id ASC ;`;
    const [categories, x] = await sequelize.query(query);

    return categories;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoriesByParentId,
  deleteCategoryById,
  getParentsByCategory,
};
