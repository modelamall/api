const models = require("../../../models")
const { Op } = require("sequelize");


const createProductCode = async ({ code }) => {
    try {
      const [productCode, created] = await models.ProductCode.findOrCreate({
        where: {
          [Op.and]: [{ code }, { deletedAt: null }]
        },
        defaults: {
          code
        }
      });
      if (!created) return null;
      return productCode;
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
  createProductCode,
    
}