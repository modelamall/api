const { Op } = require("sequelize");
const models = require("../../../models");

const createProperty = async ({ type }) => {
  try {
    const [property, created] = await models.Property.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ type }] }, { deletedAt: null }],
      },
      defaults: {
        type,
      },
    });
    if (!created) return null;
    return property;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
}}

const updateProperty = async (id, type) => {
    try {
      const property = await models.Property.findOne({
        where: {
          id,
          deletedAt: null,
        },
      });
      if (!property) {
        return null;
      }
      await property.update({ type });
      return property;
    } catch (err) {
      console.log("ERROR FROM SERVICE -->", err);
      throw new Error(err);
}}

const deleteProperty = async (id) => {
    try {
      const property = await models.Property.destroy({ where: { id } });
      if (property) {
        return property;
      }
      return null
    } catch (err) {
      console.log("ERROR FROM SERVICE -->", err);
      throw new Error(err);
    }
  }

const getAllProperties = async () => {
    try {
        const properties = await models.Property.findAll({
            where: {
                deletedAt: null
            }
        });
        return properties;
    } catch (err) {
        console.log("ERROR FROM SERVICE-->", err);
        throw new Error(err);
    }
  }
module.exports = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties
}