const response = require("../../responses");
const adminServices = require("../services");
const transformer = require("../transformers");
const services =require("../../sevices/helper")

const register = async (req, res, next) => {
  try {
    const { name, username, email, password, passwordConfirmation } = req.body;

    if (password.localeCompare(passwordConfirmation))
      return response.failedWithMessage("password dose not match !", res);

    const admin = await adminServices.createAdmin({ name, username, email, password });
    if (!admin)
      return response.failedWithMessage("this user already exist !", res);

    
    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    return response.serverError(res);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    if (!account || !password)
      return response.failedWithMessage(
        "please fill the account and password !",
        res
      );

    const admin = await adminServices.findAdmin({ account, password });
    if (!admin)
      return response.failedWithMessage(
        "admin not found please create an account",
        res
      );
    if(!services.checkPassword(password, admin?.password))  
    return response.failedWithMessage(
        "please check your password",
        res
      );
      const transformeredAdmin = transformer.adminTransformer(admin);
      const token = services.tokenGenerator(transformeredAdmin)
      res.cookie("token", token)

    return response.successWithMessage("logged successfully", res, {
      admin: transformeredAdmin,
      token
  });
  } catch (err) {
    return response.serverError(res);
  }
};

module.exports = {
  register,
  login
};
