const storeTransformer = (store)=> {
    const transformedStore = {}
    if(store) {
        transformedStore.id = store?.id,
        transformedStore.name = store?.name,
        transformedStore.username = store?.username,
        transformedStore.email = store?.email,
        transformedStore.phone = store?.phone,
        transformedStore.logo = store?.logo
        return transformedStore
    }
    return store
}

module.exports = {
    storeTransformer
}