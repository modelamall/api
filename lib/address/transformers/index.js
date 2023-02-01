const addressTransformer = (address) => {
  if (address) {
    delete address.dataValues.createdAt;
    delete address.dataValues.updatedAt;
    delete address.dataValues.deletedAt;
    delete address.dataValues.addressableId;
    delete address.dataValues.addressableType;
  }

  return address;
};

const addressesTransformer = (addresses) => {
  if (addresses.length > 0) {
    addresses.map((address) => {
      address = addressTransformer(address);
    });
  }

  return addresses;
};
module.exports = {
  addressTransformer,
  addressesTransformer,
};
