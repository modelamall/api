const express = require("express");
const { isAuth, isUser, isAdminOrUser } = require("../../sevices/middlewares");
const router = express.Router();
const {
  nameValidation,
  usernameValidation,
  genderValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  imageValidation,
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
router.get("/:id", isAuth, isAdminOrUser, controller.index);
router.put(
  "/update",
  isAuth,
  isUser,
  (req, res, next) => {
    imageValidation(req, res, next, "image", "avatar");
  },
  nameValidation,
  usernameValidation,
  genderValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  controller.update
);

module.exports = router;
