const response = require("../../responses");
const { checkPassword, tokenGenerator } = require("../../sevices/helper");
const {
  getInstanceById,
  getInstanceByText,
} = require("../../sevices/modelService");
const {
  createUser,
  findUser,
  getUser,
  updateUser,
  getAllUsers,
} = require("../services");
const { userTransformer, usersTransformer } = require("../transfomers");

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
        "please fill the account and password !",
        req,
        res
      );
    const user = await findUser({ account, password });
    if (!user)
      return response.failedWithMessage(
        "user not found please create an account",
        req,
        res
      );
    if (!checkPassword(password, user?.password))
      return response.failedWithMessage("please check your password", req, res);

    const transformedUser = userTransformer(user);
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

const index = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = +req.params.id;
    const type = req.user.type;
    console.log(type);
    if (type == "Admin" || (type == "User" && userId == id)) {
      const user = await getUser({ id });
      if (!user)
        return response.failedWithMessage("failed to get info", req, res);
      return response.successWithMessage("user info got successfully", res, {
        user: userTransformer(user),
      });
    } else
      return response.failedWithMessage(
        "you can not get this profile",
        req,
        res
      );
  } catch (err) {}
};
const update = async (req, res, next) => {
  try {
    const {
      name,
      username,
      gender,
      email,
      phone,
      currentPassword,
      newPassword,
      passwordConfirmation,
    } = req.body;
    if(!currentPassword) return response.failedWithMessage("please enter your current password !", req, res);
    if(newPassword) {
      if (newPassword.localeCompare(passwordConfirmation)) {
        return response.failedWithMessage("passwords should match", req, res);
      }
    }

    const newUser = await updateUser({
      id: req.user.id,
      name,
      username,
      gender,
      email,
      phone,
      avatar: req?.files[0]?.filename ? req?.files[0]?.filename : null,
      currentPassword,
      newPassword,
    });
    if (newUser) {
      const user = await getInstanceById(req.user.id, "User");
      const transformeredUser = userTransformer(user);
      return response.successWithMessage(
        "Updated successfully",
        res,
        transformeredUser
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
const getAll = async (req, res, next) => {
  const users = await getAllUsers();
  if (users) {
    return response.successWithMessage(
      "Successfully",
      res,
      usersTransformer(users)
    );
  } else return response.failedWithMessage("no users exist", req, res);
};
const destroy = async (req, res, next) => {
  try {
    let account 
    let user
    if (req?.user?.type == "Admin") {
      account = +req.params.id
      user = await getInstanceById(account, "User");
    }
    else if (req?.user?.type == "User") {
      account = req.user.username || req.user.email || req.user.phone;
      user = await findUser({ account });
    }
    
    if (user) {
      user.destroy();
      return response.successWithMessage("Account deleted successfully", res);
    } else {
      response.failedWithMessage("User not found", req, res);
    }
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};
module.exports = {
  register,
  logIn,
  index,
  update,
  getAll,
  destroy,
};
