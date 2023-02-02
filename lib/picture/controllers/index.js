const response = require("../../responses");
const { getInstanceById } = require("../../sevices/modelService");
const pictureServices = require("../services");
const fs = require("fs")

const create = async (req, res, next) => {
  try {
    const { pictureableType, pictureableId } = req.body;
    const pictures = await pictureServices.createPicture({
      pictureableType,
      pictureableId,
      files: req.files,
    });
    if (!pictures) {
      return response.failedWithMessage(
        "Pictures not created successfully !",
        req,
        res
      );
    }
    return response.successWithMessage(
      "Pictures created successfully",
      res
    );
  } catch (err) {
    return response.serverError(req, res);
  }
};

const deletePicture = async (req, res, next) => {
  const id = req.body.pictureId;
  const picture = await getInstanceById(id, "Picture");
  const deleted = await pictureServices.destroyPicture({ picture });
  if (deleted) {
    fs.unlink(`uploads/${picture.url}`, (err) => {if (err) {
      console.error(err)
    }})
    return response.successWithMessage("picture deleted successfully", res);
  }
  return response.serverError(req, res);
};

module.exports = {
  create,
  deletePicture,
};
