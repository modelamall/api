const userTransformer = (user)=> {
    const transformedUser = {}
    if(user) {
        transformedUser.id = user?.id,
        transformedUser.name = user?.name,
        transformedUser.username = user?.username,
        transformedUser.email = user?.email,
        transformedUser.phone = user?.phone,
        transformedUser.gender = user?.gender,
        transformedUser.avatar = user?.avatar
        return transformedUser
    }
    return user
}

module.exports = {
    userTransformer
}