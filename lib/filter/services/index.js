const models = require("../../../models");

const getFilter = async ({ id }) => {
  const filter = await models.Filter.findAll({
    where: {
      categoryId: id,
    },
    include: [{ model: models.Property, include: [{ model: models.PropertiesValue }] }],
  });
  if (filter.length > 0) {
    return filter;
  }
  return null;
};
module.exports = {
  getFilter,
};
