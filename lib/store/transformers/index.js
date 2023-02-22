const { addressTransformer } = require("../../address/transformers");
const storeTransformer = (store) => {
  if (store?.dataValues?.password) {
    
    delete store.dataValues.password;
    delete store.dataValues.createdAt;
    delete store.dataValues.updatedAt;

  }
  store.logo = process.env.serverUrl + "/uploads/" + store.logo;
  store.dataValues.Address = addressTransformer(store?.dataValues?.Address)
  store.banner = process.env.serverUrl + "/uploads/" + store.banner;
  store.dataValues.type = "Store";

  return store;
};
const storesTransformer = (stores) => {
  stores.map((store)=> {
    store = storeTransformer(store);
  })
  return stores
};

module.exports = {
  storeTransformer,
  storesTransformer
};
