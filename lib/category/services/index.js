const models = require("../../../models")
const { Op } = require("sequelize");


const createCategory = async ({ name, parentId }) => {
    try {
      const [category, created] = await models.Category.findOrCreate({
        where: {
          [Op.and]: [{ name }, { parentId }, { deletedAt: null }]
        },
        defaults: {
          name,
          parentId
        }
      });
      if (!created) return null;
      return category;
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
  createCategory,
    
}