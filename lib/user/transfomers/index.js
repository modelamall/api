const { addressesTransformer } = require("../../address/transformers");

const userTransformer = (user)=> {
    if (user?.dataValues?.password) {
            
        delete user.dataValues.password;
        delete user.dataValues.createdAt
        delete user.dataValues.updatedAt

      }
      user.avatar = process.env.serverUrl + "/uploads/" + user.avatar;
      user.dataValues.Addresses = addressesTransformer(user?.dataValues?.Addresses)
      user.dataValues.type = "User";
    return user
}
const usersTransformer = (users) => {
  users.map((user)=> {
    user = userTransformer(user);
  })
  return users
};

module.exports = {
    userTransformer,
    usersTransformer
}