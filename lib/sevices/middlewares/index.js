const responses = require("../../responses");
const authService = require("../helper");
const { getInstanceById } = require("../modelService");

const isAuth = (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if (!token) return responses.unauthorized(req, res);
    const decode = authService.decodeToken(token);
    if (!decode) return responses.unauthorized(req, res);
    req.user = {
      ...decode,
      token,
    };
    return next();
  } catch (err) {
    console.log("ERROR meddleware fun -->", err);
    return responses.unauthorized(req, res);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user?.type == "Admin") {
    const admin = await getInstanceById(req.user.id, "Admin");
    if (admin) {
      return next();
    }
  }
  return responses.forbidden(req, res);
};
const isStore = async (req, res, next) => {
  if (req.user?.type == "Store") {
    const store = await getInstanceById(req.user.id, "Store");
    if (store) {
      return next();
    }
  }
  return responses.forbidden(req, res);
};
const isUser = async (req, res, next) => {
  if (req.user?.type == "User") {
    const user = await getInstanceById(req.user.id, "User");
    if (user) {
      return next();
    }
  }
  return responses.forbidden(req, res);
};
const isAdminOrStore = (req, res, next) => {
  if (req.user?.type == "Admin") {
    return isAdmin(req, res, next)
  }else if (req.user?.type == "Store") {
    return isStore(req, res, next);
  }
  return responses.forbidden(req, res);
};
const isAdminOrUser = (req, res, next) => {
  if (req.user?.type == "Admin") {
    return isAdmin(req, res, next)
  }else if (req.user?.type == "User") {
    return isUser(req, res, next);
  }
  return responses.forbidden(req, res);
};
module.exports = {
  isAuth,
  isAdmin,
  isStore,
  isUser,
  isAdminOrStore,
  isAdminOrUser
};
