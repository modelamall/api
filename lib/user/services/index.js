const { Op } = require("sequelize");
const models = require("../../../models");
const { hashPassword } = require("../../sevices/helper");


const createUser = async ({ name , username, gender, email, phone, password }) => {
    try {
      const [user, created] = await  models.User.findOrCreate({
        where: {
          [Op .and]: [{ [Op.or]: [{ email }, { username },{phone}] }, { deletedAt: null }]
        },
        defaults: {
             name,
             username, 
             gender,
             email,
             phone,
             password: hashPassword(password)
        }
      });
      if (!created) return null;
      return user;
    } catch (err) {
      console.log("ERROR FROM SERVİCE-->", err);
      throw new Error(err);
    }
  };

  module.exports = {
    createUser
  }