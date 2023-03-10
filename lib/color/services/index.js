const { Op } = require("sequelize");
const models = require("../../../models");

const createColor = async ({ name, hex }) => {
  try {
    const [color, created] = await models.Color.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ name }, { hex }] }, { deletedAt: null }],
      },
      defaults: {
        hex,
        name,
      },
    });
    if (!created) return null;
    return color;
  } catch (err) {
    throw new Error(err);
  }
};

const getAllColor = async () => {
  const colors = await models.Color.findAll();
  if (colors.length > 0) {
    return colors;
  }
  return null;
};

const updateColor = async ({ name, hex, color }) => {
  try {
    const updatedColor = await color.update({
      name,
      hex,
    });
    if (updatedColor) {
      return updatedColor;
    } else return null;
  } catch (err) {
    throw new Error(err);
  }
};

const destroyColor = async ({ color }) => {
  try {
    const deleteColor = await color.destroy();
    if (deleteColor) {
      return deleteColor
    }
    return null
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  createColor,
  getAllColor,
  updateColor,
  destroyColor,
};
