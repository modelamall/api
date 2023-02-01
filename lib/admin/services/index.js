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

  const findAdmin = async ({ account }) => {
    try {
      const admin = await models.Admin.findOne({
        where: {
          [Op.and]: [
            { [Op.or]: [{ username: account }, { email: account }] },
            { deletedAt: null }
          ]
        }
      });
      return admin
    } catch (err) {
      throw new Error(err);
    }
  };

module.exports = {
    createAdmin,
    findAdmin
}