const models = require("../../../models");
const { Op } = require("sequelize");
const { hashPassword } = require("../../sevices/helper");

const createStore = async ({
  name,
  email,
  username,
  phone,
  logo,
  password,
}) => {
  try {
    const [store, created] = await models.Store.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ email }, { username } ,{phone}] }, { deletedAt: null }],
      },
      defaults: {
        name,
        email,
        username,
        phone,
        logo,
        password: hashPassword(password),
      },
    });
    if (!created) return null;
    return store;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};
const findStore = async ({ account, password }) => {
    try {
      const store = await models.Store.findOne({
        where: {
          [Op.and]: [
            { [Op.or]: [{ username: account }, { email: account }, { phone: account }] },
            { deletedAt: null }
          ]
        },
      });
      return store
    } catch (err) {
      console.log("ERROR FROM SERVİCE-->", err);
      throw new Error(err);
    }
  };

module.exports = {
    createStore,
    findStore
  }