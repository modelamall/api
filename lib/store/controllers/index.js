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
      logo,
      password,
      passwordConfirmation,
    } = req.body;
    if (password.localeCompare(passwordConfirmation)) {
      return failedWithMessage("passwords should match",res)
  }
    const sotre = await createStore({
      name,
      email,
      username,
      phone,
      logo,
      password,
    });
    
    if (!sotre) return failedWithMessage("this store  already exist !", res);
    return successWithMessage("account has been created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return serverError(res);
  }
};
const logIn = async (req, res, next) => {
  try {
    const { account, password } = req.body;

    if (!account || !password)
      return failedWithMessage(
        "please fill the account and password !",
        res
      );
    const store = await findStore({ account, password });
    if (!store)
      return failedWithMessage(
        "store not found please create an account",
        res
      );
    if (!checkPassword (password, store?.password))
      return failedWithMessage("please check your password", res);

    const transformedStore =storeTransformer (store);
    const token = tokenGenerator(transformedStore);
    res.cookie("token", token);
    return successWithMessage("logged successfully", res, {
      store: transformedStore,
      token,
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return serverError(res);
  }
};

module.exports = {
  register,
  logIn
};
