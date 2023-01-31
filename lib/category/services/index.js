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
};

module.exports = {
  createCategory,
};
