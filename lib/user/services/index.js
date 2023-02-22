const { response } = require("express");
const { Op } = require("sequelize");
const models = require("../../../models");
const { hashPassword, checkPassword } = require("../../sevices/helper");

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
  currentPassword,
  newPassword,
  avatar,
}) => {
  try {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await checkPassword(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    console.log(newPassword);

    const updatedUser = await user.update({
      name,
      username,
      gender,
      email,
      phone,
      password: newPassword ? hashPassword(newPassword) : user.password,
      avatar,
    });

    if (!updatedUser) {
      return response.failedWithMessage("Failed to update user");
    }

    return updatedUser;
  } catch (err) {
    console.log("ERROR FROM SERVICE -->", err);
    throw err;
  }
};
const getAllUsers = async () => {
  try {
    const users = await models.User.findAll({
      order: [["deletedAt", "ASC"]],
      paranoid: false,
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
