const models = require("../../../models")
const { Op } = require("sequelize");
const services =require("../../sevices/helper")


const createAdmin = async ({ name, username, email, password }) => {
    try {
      const [admin, created] = await models.Admin.findOrCreate({
        where: {
          [Op.and]: [{ [Op.or]: [{ email }, { username }] }, { deletedAt: null }]
        },
        defaults: {
          name,
          username,
          password: services.hashPassword(password),
          email
        }
      });
      if (!created) return null;
      return admin;
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
    createAdmin
}