const { addressTransformer } = require("../../address/transformers");

const adminTransformer = (admin) => {
  if (admin?.dataValues?.password) {
    if (admin?.dataValues?.Address) {
      admin.dataValues.Address = addressTransformer(admin?.dataValues?.Address)
    }
    delete admin.dataValues.password;
    delete admin.dataValues.createdAt
    delete admin.dataValues.updatedAt
  }
  admin.avatar = process.env.serverUrl + "/uploads/" + admin.avatar;
  admin.dataValues.type = "Admin";
  return admin;
};

const adminsTransformer = (admins) => {
  admins.map((admin)=> {
    admin = adminTransformer(admin);
  })
  return admins
};
module.exports = {
  adminTransformer,
  adminsTransformer
};
