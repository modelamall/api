const { createStore , findStore} = require("../services");
const { checkPassword, tokenGenerator } = require("../../sevices/helper");

const {
  failedWithMessage,
  successWithMessage,
  serverError,
} = require("../../responses");
const { storeTransformer } = require("../transformers");


const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      username,
      phone,
      password,
      passwordConfirmation,
    } = req.body;
    if (password.localeCompare(passwordConfirmation)) {
      return failedWithMessage("passwords should match", req, res)
  }
    const sotre = await createStore({
      name,
      email,
      username,
      phone,
      logo: req?.files[0]?.filename,
      password,
    });
    
    if (!sotre) return failedWithMessage("this store  already exist !", req, res);
    return successWithMessage("account has been created successfully", res);
  } catch (err) {
    return serverError(req, res);
  }
};
const logIn = async (req, res, next) => {
  try {
    const { account, password } = req.body;

    if (!account || !password)
      return failedWithMessage(
        "please fill the account and password !", req,
        res
      );
    const store = await findStore({ account, password });
    if (!store)
      return failedWithMessage(
        "store not found please create an account", req,
        res
      );
    if (!checkPassword (password, store?.password))
      return failedWithMessage("please check your password", req, res);
    const transformedStore =storeTransformer (store);
    const token = tokenGenerator(transformedStore.dataValues);
    res.cookie("token", token);
    return successWithMessage("logged successfully", res, {
      store: transformedStore,
      token,
    });
  } catch (err) {
    return serverError(req, res);
  }
};

module.exports = {
  register,
  logIn
};
