const response = require('../../responses');
const { getInstanceById } = require('../../sevices/modelService');
const { createAddress, updateAddress, deleteAddress, getAddress } = require('../services');


const addAddress = async (req, res, next) => {
    try {
      const {cityId,address,title,postCode} = req.body;
      const id = req.user.id
      const type = req.user.type
      const city = await getInstanceById(+cityId, "City");
      const Address = await createAddress ({id, type, cityId,address,title,postCode})
      if(Address) {
        const resAddress = await getAddress({addressId: Address.id})
        return response.successWithMessage("address created successfully", res, resAddress);
      }else{
        return response.failedWithMessage("failed to create new address", res);
      }
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
}

/* const getSingleAddress = async (req, res) => {
  try {
    const singleAdress = await getAddress({userId: req.user.id, addressId: req.addressId})
    if(singleAdress) {
      return response.successWithMessage('got it successfully', res, singleAdress)
    }
    return response.failedWithMessage('failed to get the single address', res)
  } catch(err){
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
} */

const update = async (req, res, next) => {
  try {
    const { cityId, address, title, postCode } = req.body
    const id = req.user.id
    const addressId = +req.params.addressid
    const Address = await getInstanceById(addressId, "Address")
    if (id === Address?.addressableId) {
      const city = await getInstanceById(cityId, "City")
      if (city) {
        const update = await updateAddress({ Address, cityId, address, title, postCode })
        if (update) {
          return response.successWithMessage("Address updated successfully", res, update)
        }
        return response.failedWithMessage("Address not found!", req, res)
      }
    } else {
      return response.failedWithMessage("You can't update this address!", req,res)
    }
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
}

const destroy = async (req, res, next) => {
  try {
    const addressId = +req.params.addressId;
    const id = req.user.id
    const Address = await getInstanceById(addressId, "Address")
    if (id === Address?.addressableId) {
      const deletedAddress = await deleteAddress ({ addressId });
      if (deletedAddress) {
        return response.successWithMessage("Address deleted successfully", res);
      }
      return response.failedWithMessage("Address not found!", req, res);
    } else {
      return response.failedWithMessage("You can't delete this address!", req,res);
    }
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};
  module.exports={
    addAddress,
    update,
    destroy
   }