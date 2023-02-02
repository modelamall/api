const models = require("../../../models");

const createPicture = async ({ pictureableType, pictureableId, files }) => {
  try {
    const pictures = [];
    const picturesArray = async () => {
      for (let i = 0; i < files.length; i++) {
        pictures.push({
          url: files[i].filename,
          pictureableType,
          pictureableId
        });
      }
    };
    await picturesArray();
    const create = await models.Picture.bulkCreate(pictures);
    if (create) {
      return create;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const destroyPicture = async ({ picture }) => {
  try {
    const deletePicture = await picture.destroy();
    if (deletePicture) {
      return deletePicture;
    }
    return null;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  createPicture,
  destroyPicture,
};
