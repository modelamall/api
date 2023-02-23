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
    return admin;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllAdmin = async ({ id }) => {
  try {
    const admins = await models.Admin.findAll({
      where: {
        id: { [Op.not]: id },
      },
      order: [["deletedAt", "ASC"]],
      paranoid: false,
      include: [{ model: models.Address }],
    });
    return admins;
  } catch (err) {
    throw new Error(err);
  }
};

const getSingelProfile = async ({ id }) => {
  try {
    const admins = await models.Admin.findOne({
      where: { id },
      include: [{ model: models.Address }],
    });
    return admins;
  } catch (err) {
    throw new Error(err);
  }
};

const updateAdmin = async ({
  admin,
  name,
  username,
  email,
  password,
  avatar,
}) => {
  try {
    const newAdmin = await admin.update({
      avatar,
      name,
      username,
      email,
      password: services.hashPassword(password),
    });
    if (newAdmin) return newAdmin;
    return null;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw err;
  }
};

const destroyAdmin = async ({ admin }) => {
  try {
    const destroyAdmin = await admin.destroy();
    if (destroyAdmin) {
      return destroyAdmin;
    }
    return null;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  createAdmin,
  findAdmin,
  getAllAdmin,
  getSingelProfile,
  updateAdmin,
  destroyAdmin,
};
