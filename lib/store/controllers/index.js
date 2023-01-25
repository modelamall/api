const {
  failedWithMessage,
  successWithMessage,
  serverError,
} = require("../../responses");

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
    const sotre = await services.createStore({
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

module.exports = {
  register,
};
