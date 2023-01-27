const { Op } = require("sequelize");
const models = require("../../../models");



const createProvince = async ({ name }) => {
    try {
      const [province, created] = await  models.Province.findOrCreate({
        where: {
          [Op .and]: [{ [Op.or]: [{ name }]}, { deletedAt: null }]
        },
        defaults: {
        name
        }
      });
      if (!created) return null;
      return province;
    } catch (err) {
      console.log("ERROR FROM SERVİCE-->", err);
      throw new Error(err);
    }
  }
  
  module.exports = {
    createProvince
  }