const express = require("express")
const router = express.Router()
const {
  nameValidation,
  usernameValidation,
  genderValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
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
  controller.register);
router.post("/login", controller.logIn);

module.exports = router;
