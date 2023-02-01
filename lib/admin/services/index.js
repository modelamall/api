const models = require("../../../models");
const { Op } = require("sequelize");
const services = require("../../sevices/helper");

const createAdmin = async ({ name, username, email, password }) => {
  try {
    const [admin, created] = await models.Admin.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ email }, { username }] }, { deletedAt: null }],
      },
      defaults: {
        name,
        username,
        password: services.hashPassword(password),
        email,
      },
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
          { deletedAt: null },
        ],
      },
      include: [{ model: models.Address }],
    });
    return admin;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllAdmin = async () => {
  try {
    const admins = await models.Admin.findAll({
      include: [{ model: models.Address }],
    });
    return admins;
  } catch (err) {
    throw new Error(err);
  }
};

const getSingelProfile = async ({id}) => {
  try {
    const admins = await models.Admin.findOne({
      where: {id},
      include: [{ model: models.Address }],
    });
    return admins;
  } catch (err) {
    throw new Error(err);
  }
};

const updateAdmin = async ({
  id,
  name,
  username,
  email,
  password,
}) => {
  try {
    const newAdmin = await models.Admin.update(
      {
        name,
        username,
        email,
        password: services.hashPassword(password),
      },
      {
        where: {
          id
        },
      }
    );
    if (!newAdmin[0]) return null;
    return newAdmin;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw err;
  }
};

module.exports = {
  createAdmin,
  findAdmin,
  getAllAdmin,
  getSingelProfile,
  updateAdmin
};
