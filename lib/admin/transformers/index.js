const adminTransformer = (admin) => {
  if (admin?.dataValues?.password) {
    delete admin.dataValues.password;
  }
  admin.dataValues.type = "admin";
  return admin;
};
module.exports = {
  adminTransformer,
};
