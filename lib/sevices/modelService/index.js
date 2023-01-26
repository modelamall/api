const models = require("../../../models");

const getInstanceById = async (id, modelName) => {
  if (models[modelName]) {
    const _id = +id;
    if (typeof _id === "number" && _id > 0) {
      const instance = await models[modelName].findAll({ where: { id: _id } });
      if (instance.length > 0)
        return instance;
    }
    return null;
  } else {
    throw new Error("Model not found");
  }
};

module.exports = {
  getInstanceById,
};
