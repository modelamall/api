const models = require("../../../models");

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
}

const getAddress = async({addressId}) => {
  try {
    const res = await models.Address.findOne({
      where:{
        id: addressId
      },
      include:[{model: models.City, include:[{model: models.Province}]}]
    },
    )
    return res ? res : null
  } catch(err){
    console.log("ERROR FROM SERVICE-->", err);
    throw new Error(err)
  }
}

const updateAddress = async ({ Address, cityId, address, title, postCode }) => {
  try {
    const updatedAddress = await Address.update({
      cityId,
      address,
      title,
      postcode: postCode,
    });
    if (updatedAddress) return updatedAddress;
    return null;
  } catch (err) {
    console.log("ERROR FROM SERVICE-->", err);
    throw new Error(err);
  }
}

const deleteAddress = async ({ addressId }) => {
  try {
    const deletedAddress = await models.Address.destroy({
      where: { id: addressId },
    });
    if (!deletedAddress) return null;
    return deletedAddress;
  } catch (err) {
    console.log("ERROR FROM SERVICE-->", err);
    throw new Error(err);
  }
}

const getAddressByAddressableId = async(addressableId) => {
  try {
    const res = await models.Address.findAll({
      where:{
        addressableId
      },
    },
    )
    return res ? res : null
  } catch(err){
    console.log("ERROR FROM SERVICE-->", err);
    throw new Error(err)
  }
}

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getAddressByAddressableId
}
