const models = require("../../../models");
const { Op } = require("sequelize");


const createAddress = async ({id, type, cityId, address, title, postCode }) => {
  try {
    const created = await models.Address.create({
        addressableId: id,
        cityId,
        address,
        title,
        postcode:postCode,
        addressableType:type
      
    });
    if (!created) return null;
    return created;
  } catch (err) {
    console.log("ERROR FROM SERVICE-->", err);
    throw new Error(err);
  }
};

module.exports = {
  createAddress,
};
