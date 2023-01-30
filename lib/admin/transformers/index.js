const adminTransformer = (admin) => {
  if (admin?.dataValues?.password) {
    delete admin.dataValues.password;
  }
  admin.dataValues.type = "Admin";
  return admin;
};
module.exports = {
  adminTransformer,
};
