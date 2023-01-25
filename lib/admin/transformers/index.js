const adminTransformer = (admin)=> {
    const transformeredAdmin = {}
    if(admin) {
        transformeredAdmin.id = admin?.id,
        transformeredAdmin.email = admin?.email,
        transformeredAdmin.username = admin?.username,
        transformeredAdmin.name = admin?.name
        return transformeredAdmin
    }
    return admin
}
module.exports = {
    adminTransformer,
}