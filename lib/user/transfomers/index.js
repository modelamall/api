const userTransformer = (user)=> {
    if (user?.dataValues?.password) {
        delete user.dataValues.password;
        delete user.dataValues.createdAt
        delete user.dataValues.updatedAt
        delete user.dataValues.deletedAt

      }
      user.avatar = process.env.serverUrl + "/uploads/" + user.avatar;
      user.dataValues.type = "User";
    return user
}

module.exports = {
    userTransformer
}