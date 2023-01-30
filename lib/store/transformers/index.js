const storeTransformer = (store) => {
  if (store?.dataValues?.password) {
    delete store.dataValues.password;
  }
  store.logo = process.env.serverUrl + "/uploads/" + store.logo;
  store.banner = process.env.serverUrl + "/uploads/" + store.banner;
  store.dataValues.type = "Store";

  return store;
};

module.exports = {
  storeTransformer,
};
