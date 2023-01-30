const {
  createColor,
  getAllColor,
  updateColor,
  destroyColor,
} = require("../services");
const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
const models = require("../../../models");

const addColor = async (req, res, next) => {
  try {
    const { hex, name } = req.body;
    const color = await createColor({ name, hex });
    if (!color) {
      return response.failedWithMessage("Color already exist", req, res);
    }
    return response.successWithMessage("Color created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const getColor = async (req, res, next) => {
  try {
    const colors = await getAllColor();
    if (!colors) {
      return response.serverError(req, res);
    }
    return response.successWithMessage("Successfully", res, colors);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const putColor = async (req, res, next) => {
  try {
    const { hex, name } = req.body;
    const id = +req.params.id;
    const color = await getInstanceById(id, "Color");
    if (color) {
      const chekColor = await models.Color.findOne({ where: { hex } });
      if (!chekColor || chekColor?.id === id) {
        const updatedColor = await updateColor({ name, hex, color });
        if (updatedColor) {
          return response.successWithMessage(
            "Color update successfully",
            res,
            updatedColor
          );
        } else return response.serverError(req, res);
      } else
        return response.failedWithMessage("Color hex already exist", req, res);
    } else return response.failedWithMessage("Color id is not found", req, res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const deleteColor = async (req, res, next) => {
  const id = +req.params.id;
  const color = await getInstanceById(id, "Color");
  if (color) {
    const deleted = await destroyColor({color});
    if (deleted) {
      return response.successWithMessage("Color deleted successfully", res);
    }
    return response.serverError(req, res);
  }
  return response.failedWithMessage("Color id is not found", req, res);
};

module.exports = {
  addColor,
  getColor,
  putColor,
  deleteColor,
};
