const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

const {
  emailValidation,
  nameValidation,
  usernameValidation,
  passwordValidation,
  phoneValidation,
  logoValidation,
  imageValidation,
} = require("../../validations");

router.post(
  "/register",
  (req, res, next) => {
    imageValidation(req, res, next, "image", "logo");
  },
  logoValidation,
  emailValidation,
  nameValidation,
  usernameValidation,
  passwordValidation,
  phoneValidation,
  controllers.register
);
router.post("/login", controllers.logIn);

module.exports = router;
