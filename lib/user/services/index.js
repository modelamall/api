const { Op } = require("sequelize");
const models = require("../../../models");
const { hashPassword } = require("../../sevices/helper");

const createUser = async ({
  name,
  username,
  gender,
  email,
  phone,
  password,
}) => {
  try {
    const [user, created] = await models.User.findOrCreate({
      where: {
        [Op.and]: [
          { [Op.or]: [{ email }, { username }, { phone }] },
          { deletedAt: null },
        ],
      },
      defaults: {
        name,
        username,
        gender,
        email,
        phone,
        password: hashPassword(password),
      },
    });
    if (!created) return null;
    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const findUser = async ({ account, password }) => {
  try {
    const user = await models.User.findOne({
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
      include: [{ model: models.Address }],
    });
    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const getUser = async ({ id }) => {
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
      include: [{ model: models.Address }],
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
};
const updateUser = async ({
  
  id,
  name,
  username,
  gender,
  email,
  phone,
  password,
  avatar,
}) => {
  try {
    const newUser = await models.User.update(
      {
        name,
        username,
        gender,
        email,
        phone,
        password: hashPassword(password),
        avatar,
      },
      {
        where: {
          id
        },
      }
    );
    if (!newUser) return null;
    return newUser;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw err;
  }
};
const getAllUsers = async () => {
  try {
    const users = await models.User.findAll({
      include: [{ model: models.Address }],
    });
    if (users.length > 0) {
      return users;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createUser,
  findUser,
  getUser,
  updateUser,
  getAllUsers,
};
