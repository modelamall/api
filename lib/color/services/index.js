const models = require("../../../models")



const createColor = async (Oj) => {
  try {
    return await models.Color.create({
      hex: Oj.hex,
      name: Oj.name,
    });
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  createColor
    
}