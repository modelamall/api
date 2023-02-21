const response = require("../../responses");
const adminServices = require("../services");
const transformer = require("../transformers");
const services = require("../../sevices/helper");
const { getInstanceById } = require("../../sevices/modelService");
const password_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const register = async (req, res, next) => {
  try {
    const { name, username, email, password, passwordConfirmation } = req.body;

    if (password.localeCompare(passwordConfirmation))
      return response.failedWithMessage("password dose not match !", req, res);

    const admin = await adminServices.createAdmin({
      name,
      username,
      email,
      password,
    });
    if (!admin)
      return response.failedWithMessage("this user already exist !", req, res);

    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    return response.serverError(req, res);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    if (!account || !password)
      return response.failedWithMessage(
        "please fill the account and password !",
        req,
        res
      );

    const admin = await adminServices.findAdmin({ account });
    if (!admin)
      return response.failedWithMessage(
        "admin not found please create an account",
        req,
        res
      );
    if (!services.checkPassword(password, admin?.password))
      return response.failedWithMessage("please check your password", req, res);
    const transformeredAdmin = transformer.adminTransformer(admin);
    const token = services.tokenGenerator(transformeredAdmin.dataValues);
    res.cookie("token", token);

    return response.successWithMessage("logged successfully", res, {
      admin: transformeredAdmin,
      token,
    });
  } catch (err) {
    return response.serverError(req, res);
  }
};

const getSingelProfile = async (req, res, next) => {
  const id = req.params.id;
  const admin = await adminServices.getSingelProfile({ id });
  if (admin) {
    const transformeredAdmin = transformer.adminTransformer(admin);
    return response.successWithMessage("Successfully", res, transformeredAdmin);
  }
  return response.failedWithMessage(
    "admin not found please create an account",
    req,
    res
  );
};

const getAllAdmin = async (req, res, next) => {
  const admins = await adminServices.getAllAdmin({id: req.user.id});
  const transformeredAdmin = transformer.adminsTransformer(admins);
  return response.successWithMessage("Successfully", res, transformeredAdmin);
};

const update = async (req, res, next) => {
  try {
    const {
      name,
      email,
      username,
      password,
      passwordConfirmation,
      currentPassword,
    } = req.body;
    if (!currentPassword)
      return response.failedWithMessage(
        "please enter your current password !",
        req,
        res
      );
    if (password) {
      if (!password_regex.test(password))
        return response.failedWithMessage("Password should be at least 6 charaters and contains capital, small ,numbers and spical charaters", req, res);

      if (password.localeCompare(passwordConfirmation)) {
        return response.failedWithMessage("passwords should match", req, res);
      }
    }
    const admin = await getInstanceById(req.user.id, "Admin");
    const isPasswordValid = await services.checkPassword(
      currentPassword,
      admin.password
    );
    if (!isPasswordValid) {
      return response.failedWithMessage("Old password is incorrect", req, res);
    }
    const newAdmin = await adminServices.updateAdmin({
      admin,
      name,
      username,
      email,
      password: password ? password : currentPassword,
      avatar: req?.files[0]?.filename,
    });
    if (newAdmin) {
      const transformeredAdmin = transformer.adminTransformer(newAdmin);
      return response.successWithMessage(
        "Updated successfully",
        res,
        transformeredAdmin
      );
    } else
      return response.failedWithMessage(
        "faild to update your profile",
        req,
        res
      );
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};
const deleteAdmin = async (req, res, next) => {
  const id = +req.params.id;
  const admin = await getInstanceById(id, "Admin");
  if (admin) {
    const deleted = await adminServices.destroyAdmin({admin});
    if (deleted) {
      return response.successWithMessage("Admin deleted successfully", res);
    }
    return response.serverError(req, res);
  }
  return response.failedWithMessage("Admin id is not found", req, res);
};

module.exports = {
  register,
  login,
  getSingelProfile,
  getAllAdmin,
  update,
  deleteAdmin,
};
