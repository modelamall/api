const express = require("express");
const { isAuth, isUser } = require("../../sevices/middlewares");
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
router.get("/index", isAuth, controller.index);
router.put(
  "/update",
  isAuth,
  isUser,
  (req, res, next) => {
    imageValidation(req, res, next, "image", "avatar");
  },
  controller.update
);

module.exports = router;
