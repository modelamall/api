const { Op } = require("sequelize");
const models = require("../../../models");
const Sequelize = require("sequelize");

const createPropertyValue = async ({ value, propertyId }) => {
  try {
    const [propertyValue, created] = await models.PropertiesValue.findOrCreate({
      where: {
        [Op.and]: [{ value }, { propertyId }, { deletedAt: null }],
      },
      defaults: {
        propertyId,
        value,
      },
    });
    if (!created) return null;
    return propertyValue;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const updatePropertyValue = async (id, value) => {
  try {
    const propertyValue = await models.PropertiesValue.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    if (!propertyValue) {
      return null;
    }
    await propertyValue.update({ value });
    return propertyValue;
  } catch (err) {
    console.log("ERROR FROM SERVICE -->", err);
    throw new Error(err);
  }
};

const deletePropertyValue = async (id) => {
  try {
    const propertyValue = await models.PropertiesValue.destroy({ where: { id } });
    if (propertyValue) {
      return propertyValue;
    }
    return null;
  } catch (err) {
    console.log("ERROR FROM SERVICE -->", err);
    throw new Error(err);
  }
};

const getAllPropertyValues = async ({ paranoid }) => {
  try {
    const propertyValues = await models.PropertiesValue.findAll({
      order: [["deletedAt", "ASC"]],
      paranoid,
      include: [{ model: models.Property, paranoid : false }]
    });
    return propertyValues;
  } catch (err) {
    console.log("ERROR FROM SERVICE-->", err);
    throw new Error(err);
  }
};

module.exports = {
  createPropertyValue,
  updatePropertyValue,
  deletePropertyValue,
  getAllPropertyValues,
};
