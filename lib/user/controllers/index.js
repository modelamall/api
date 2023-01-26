const response = require("../../responses");
const { checkPassword, tokenGenerator} = require("../../sevices/helper");
const { createUser, findUser, getUser } = require("../services");
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
      return response.failedWithMessage("passwords should match", res);
    }
    if (!user)
      return response.failedWithMessage("this user already exist !", res);
    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { account, password } = req.body;

    if (!account || !password)
      return response.failedWithMessage(
        "please fill the account and password !",
        res
      );
    const user = await findUser({ account, password });
    if (!user)
      return response.failedWithMessage(
        "user not found please create an account",
        res
      );
    if (!checkPassword (password, user?.password))
      return response.failedWithMessage("please check your password", res);

    const transformedUser =userTransformer (user);
    const token = tokenGenerator(transformedUser);
    res.cookie("token", token);
    return response.successWithMessage("logged successfully", res, {
      user: transformedUser,
      token,
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const index = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await getUser ({userId})
    console.log(user)
    if(!user) return response.failedWithMessage("failed to get info", res)
    return response.successWithMessage("user info got successfully", res, {user: userTransformer (user)})
  } catch(err) {

  }
}

module.exports = {
  register,
  logIn,
  index,
};
