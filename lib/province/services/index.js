const { Op } = require("sequelize");
const models = require("../../../models");

const createProvince = async ({ name }) => {
  try {
    const [province, created] = await models.Province.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ name }] }, { deletedAt: null }],
      },
      defaults: {
        name,
      },
    });
    if (!created) return null;
    return province;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const updateProvince = async (id, name) => {
  try {
    const province = await models.Province.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!province) {
      return null;
    }
    await province.update({ name });
    return province;
  } catch (err) {
    console.log("ERROR FROM SERVICE -->", err);
    throw new Error(err);
  }
};

const deleteProvince = async (id) => {
  try {
    const province = await models.Province.destroy({ where: { id } });
    if (province) {
      return province;
    }
  } catch (err) {
    console.log("ERROR FROM SERVICE -->", err);
    throw new Error(err);
  }
};

const getAllProvinces = async () => {
  try {
      const provinces = await models.Province.findAll({
          where: {
              deletedAt: null
          }
      });
      return provinces;
  } catch (err) {
      console.log("ERROR FROM SERVICE-->", err);
      throw new Error(err);
  }
}

module.exports = {
  createProvince,
  updateProvince,
  deleteProvince,
  getAllProvinces
};
