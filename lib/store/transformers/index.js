const storeTransformer = (store) => {
  const transformedStore = {};
  if (store) {
    transformedStore.id = store?.id;
    transformedStore.name = store?.name;
    transformedStore.username = store?.username;
    transformedStore.email = store?.email;
    transformedStore.phone = store?.phone;
    store?.logo ? transformedStore.logo = process.env.serverUrl + "/uploads/" + store?.logo : transformedStore.logo = null
    store?.banner ? transformedStore.banner = process.env.serverUrl + "/uploads/" + store?.banner : transformedStore.banner = null
    return transformedStore;
  }
  return store;
};

module.exports = {
  storeTransformer,
};
