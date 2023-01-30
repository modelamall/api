const models = require("../../../models");

const getInstanceById = async (id, modelName) => {
  if (models[modelName]) {
    if (typeof id === "number" && id > 0) {
      const instance = await models[modelName].findByPk(id);
      if (instance) return instance;
    }
    return null;
  } else {
    throw new Error("Model not found");
  }
};
const getInstanceByNameOrCreate = async (nameIndex, name, modelName) => {
  try {
    if (models[modelName]) {
      const [instance, created] = await models[modelName].findOrCreate({
        where: {
          [nameIndex]: name,
        },
        defaults: {
          [nameIndex]: name,
        },
      });
      if (!created) {
        async () => {
          const _instance = await models[modelName].findOne({
            [nameIndex]: name,
          });
          return _instance;
        };
      }
      return instance;
    } else {
      throw new Error("Model not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getInstanceById,
  getInstanceByNameOrCreate,
};
