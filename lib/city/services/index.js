const { Op } = require("sequelize");
const models = require("../../../models");

const createCity = async ({ name, provinceId }) => {
    try {
        const [city, created] = await models.City.findOrCreate({
            where: {
              [Op.and]: [{ provinceId }, { name }, { deletedAt: null }]
            },
            defaults: {
              name,
              provinceId
            }
          });
          if (!created) return null;
          return city;
    } catch (err) {
      console.log("ERROR FROM SERVICE-->", err);
      throw new Error(err);
    }
};

const updateCity = async ({ id, name, provinceId }) => {
    try {
    const city = await models.City.findByPk(id)
    if (!city) throw new Error("City not found.")
    const province = await models.Province.findByPk(provinceId)
if (!province) throw new Error("Province not found.")

await city.update({ name, provinceId })
return city
} catch (err) {
    throw new Error(err)
}
}
const destroyCity = async (id) => {
    try {
        const city = await models.City.findByPk(id);
        if (!city) throw new Error("City not found.");

        await city.destroy();
        return { message: "City deleted successfully" };
    } catch (err) {
        throw new Error(err);
    }
};

const getAllCities = async () => {
    try {
        const cities = await models.City.findAll({
            where: {
                deletedAt: null
            }
        });
        return cities;
    } catch (err) {
        console.log("ERROR FROM SERVICE-->", err);
        throw new Error(err);
    }
  }
  
const getCitiesByProvinceId = async (provinceId) => {
    try {
        const cities = await models.City.findAll({
            where: {
                provinceId,
                deletedAt: null
            }
        });
        return cities;
    } catch (err) {
        console.log("ERROR FROM SERVICE-->", err);
        throw new Error(err);
    }
}

module.exports = {
  createCity,
  updateCity,
  destroyCity,
  getAllCities,
  getCitiesByProvinceId

};
