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
        [Op.and]: [
          { [Op.or]: [{ email }, { username }, { phone }] },
          { deletedAt: null },
        ],
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
          {
            [Op.or]: [
              { username: account },
              { email: account },
              { phone: account },
            ],
          },
          { deletedAt: null },
        ],
      },
      include: [
        {
          model: models.Address,
          include: [
            {
              model: models.City,
              attributes: ["id", "name"],
              include: [{ model: models.Province, attributes: ["id", "name"] }],
            },
          ],
        },
      ],
    });
    return store;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};
const getAllStores = async () => {
  try {
    const stores = await models.Store.findAll({
      order: [["deletedAt", "ASC"]],
      paranoid: false,
      include: [
        {
          model: models.Address,
          include: [
            {
              model: models.City,
              attributes: ["id", "name"],
              include: [{ model: models.Province, attributes: ["id", "name"] }],
            },
          ],
        },
      ],
    });
    if (stores.length > 0) {
      return stores;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};
const getStore = async ({ id }) => {
  try {
    const store = await models.Store.findOne({
      where: {
        id,
      },
      include: [{ model: models.Address, include: [{ model: models.City }] }]
    });
    return store;
  } catch (err) {
    throw new Error(err);
  }
};
const updateStore = async ({
  id,
  name,
  username,
  email,
  phone,
  password,
  logo,
  banner,
}) => {
  try {
    const newStore = await models.Store.update(
      {
        name,
        username,
        email,
        phone,
        password: hashPassword(password),
        logo,
        banner,
      },
      {
        where: {
          id,
        },
      }
    );
    if (!newStore) return null;
    return newStore;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw err;
  }
};
module.exports = {
  createStore,
  findStore,
  getAllStores,
  getStore,
  updateStore,
};
