const express = require("express");
const {
  isAuth,
  isUser,
  isAdminOrUser,
  isAdmin,
} = require("../../sevices/middlewares");
const router = express.Router();
const {
  nameValidation,
  usernameValidation,
  genderValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  imageValidation,
  usernameActiveValidation,
  emailActiveValidation,
  phoneActiveValidation,
} = require("../../validations");
const controller = require("../controllers");

router.post(
  "/register",
  nameValidation,
  usernameValidation,
  genderValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  controller.register
);
router.post("/login", controller.logIn);
router.get("/all", isAuth, isAdmin, controller.getAll);
router.get("/:id", isAuth, isAdminOrUser, controller.index);
router.put(
  "/update",
  isAuth,
  isUser,
  (req, res, next) => {
    imageValidation(req, res, next, "image", "avatar");
  },
  (req, res, next) => {
    usernameActiveValidation(req, res, next, "User");
  },
  (req, res, next) => {
    emailActiveValidation(req, res, next, "User");
  },
  (req, res, next) => {
    phoneActiveValidation(req, res, next, "User");
  },

  nameValidation,
  usernameValidation,
  genderValidation,
  emailValidation,
  phoneValidation,
  //passwordValidation,
  controller.update
);
router.delete("/:id", isAuth, isAdminOrUser, controller.destroy);

module.exports = router;
