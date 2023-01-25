const response = require("../../responses");
const services = require("../services");

const register = async (req, res, next) => {
  try {
    const { name, username, email, password, passwordConfirmation } = req.body;

    if (password.localeCompare(passwordConfirmation))
      return response.failedWithMessage("password dose not match !", res);

    const admin = await services.createAdmin({ name, username, email, password });
    if (!admin)
      return response.failedWithMessage("this user already exist !", res);

    
    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    return response.serverError(res);
  }
};

module.exports = {
  register,
};
