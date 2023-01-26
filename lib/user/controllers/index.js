const response = require("../../responses");
const { checkPassword, tokenGenerator } = require("../../sevices/helper");
const { createUser, findUser } = require("../services");
const { userTransformer } = require("../transfomers");

const register = async (req, res, next) => {
  try {
    const {
      name,
      username,
      gender,
      email,
      phone,
      password,
      passwordConfirmation,
    } = req.body;
    const user = await createUser({
      name,
      username,
      gender,
      email,
      phone,
      password,
    });
    if (password.localeCompare(passwordConfirmation)) {
      return response.failedWithMessage("passwords should match", req, res);
    }
    if (!user)
      return response.failedWithMessage("this user already exist !", req, res);
    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { account, password } = req.body;

    if (!account || !password)
      return response.failedWithMessage(
        "please fill the account and password !", req,
        res
      );
    const user = await findUser({ account, password });
    if (!user)
      return response.failedWithMessage(
        "user not found please create an account", req,
        res
      );
    if (!checkPassword (password, user?.password))
      return response.failedWithMessage("please check your password", req, res);

    const transformedUser =userTransformer (user);
    const token = tokenGenerator(transformedUser.dataValues);
    res.cookie("token", token);
    return response.successWithMessage("logged successfully", res, {
      user: transformedUser,
      token,
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
};
module.exports = {
  register,
  logIn,
};
