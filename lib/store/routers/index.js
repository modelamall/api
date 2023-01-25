const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middlewares = require("../../sevices/middlewares");

const {
  emailValidation,
  nameValidation,
  usernameValidation,
  passwordValidation,
  phoneValidation,
  logoValidation,
} = require("../../validations");

router.post(
  "/register",
  emailValidation,
  nameValidation,
  usernameValidation,
  passwordValidation,
  phoneValidation,
  logoValidation,
  controllers.register
);


module.exports = router;
