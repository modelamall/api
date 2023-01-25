const responses = require("../../responses");
const authService = require("../helper");

const isAuth = (req, res, next) => {
  try {
    const token =
      req?.cookies?.token ||
      req?.headers?.authorization?.split(" ")[1] ||
      req?.headers?.Authorization?.split(" ")[1] ||
      null;
    if (!token) return responses.unauthorized(res);
    const decode = authService.decodeToken(token);
    if (!decode) return responses.unauthorized(res);
    req.user = {
      ...decode,
      token,
    };
    return next();
  } catch (err) {
    console.log("ERROR meddleware fun -->", err);
    return responses.unauthorized(res);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.type == "admin") {
    return next();
  }
  return responses.forbidden(res);
};
const isStore = (req, res, next) => {
  if (req.user.type == "store") {
    return next();
  }
  return responses.forbidden(res);
};
const isUser = (req, res, next) => {
  if (req.user.type == "user") {
    return next();
  }
  return responses.forbidden(res);
};

module.exports = {
  isAuth,
  isAdmin,
  isStore,
  isUser,
};