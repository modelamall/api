const {
  createStore,
  findStore,
  getAllStores,
  getStore,
  updateStore,
} = require("../services");
const { checkPassword, tokenGenerator } = require("../../sevices/helper");
const password_regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const {
  failedWithMessage,
  successWithMessage,
  serverError,
} = require("../../responses");
const { storeTransformer, storesTransformer } = require("../transformers");
const { getInstanceById } = require("../../sevices/modelService");

const register = async (req, res, next) => {
  try {
    const { name, email, username, phone, password, passwordConfirmation } =
      req.body;

    if (password.localeCompare(passwordConfirmation)) {
      return failedWithMessage("passwords should match", req, res);
    }
    const sotre = await createStore({
      name,
      email,
      username,
      phone,
      logo: req?.files[0].filename,
      password,
    });

    if (!sotre)
      return failedWithMessage("this store  already exist !", req, res);
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
        "please fill the account and password !",
        req,
        res
      );
    const store = await findStore({ account, password });
    if (!store)
      return failedWithMessage(
        "store not found please create an account",
        req,
        res
      );
    if (!checkPassword(password, store?.password))
      return failedWithMessage("please check your password", req, res);
    const transformedStore = storeTransformer(store);
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
const getAll = async (req, res, next) => {
  const stores = await getAllStores();
  if (stores) {
    return successWithMessage("Successfully", res, storesTransformer(stores));
  } else return failedWithMessage("no users exist", req, res);
};
const index = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = +req.params.id;
    const type = req.user.type;
    if (type == "Admin" || (type == "Store" && userId == id)) {
      const store = await getStore({ id });
      if (!store) return failedWithMessage("failed to get info", req, res);
      return successWithMessage("store info got successfully", res, {
        store: storeTransformer(store),
      });
    } else return failedWithMessage("you can not get this profile", req, res);
  } catch (err) {}
};
const destroy = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const store = await getInstanceById(id, "Store");
    if (store) {
      store.destroy();
      return successWithMessage("store deleted successfully", res);
    } else {
      failedWithMessage("store not found", req, res);
    }
  } catch (err) {
    console.log("ERROR--> ", err);
    return serverError(res);
  }
};
const update = async (req, res, next) => {
  try {
    const {
      name,
      username,
      email,
      phone,
      currentPassword,
      newPassword,
      passwordConfirmation,
    } = req.body;
    if (!currentPassword)
      return failedWithMessage(
        "please enter your current password !",
        req,
        res
      );
    if (newPassword) {
      if (!password_regex.test(newPassword))
        return failedWithMessage(
          "Password should be at least 6 charaters and contains capital, small ,numbers and spical charaters",
          req,
          res
        );

      if (newPassword.localeCompare(passwordConfirmation)) {
        return failedWithMessage("passwords should match", req, res);
      }
    }
    let logo;
    let banner;
    for (let i = 0; i < req.files.length; i++) {
      if (req?.files[i]?.fieldname == "logo") {
        logo = req?.files[i]?.filename;
      } else if (req?.files[i]?.fieldname == "banner") {
        banner = req?.files[i]?.filename;
      }
    }
    const storeCheck = await getInstanceById(req.user.id, "Store");
    const isPasswordValid = await checkPassword(
      currentPassword,
      storeCheck.password
    );
    if (!isPasswordValid) {
      return failedWithMessage("Old password is incorrect", req, res);
    }
    const newStore = await updateStore({
      id: req.user.id,
      name,
      username,
      email,
      phone,
      logo,
      banner,
      password : newPassword ? newPassword : currentPassword,
    });
    if (newStore) {
      const store = await getInstanceById(req.user.id, "Store");
      return successWithMessage(
        "Updated successfully",
        res,
        storeTransformer(store)
      );
    } else return failedWithMessage("faild to update your profile", req, res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return serverError(req, res);
  }
};
module.exports = {
  register,
  logIn,
  getAll,
  index,
  destroy,
  update,
};
