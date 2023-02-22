const express = require("express");
const router = express.Router();
const {
  passwordValidation,
  emailValidation,
  nameValidation,
  usernameValidation,
  usernameActiveValidation,
  emailActiveValidation,
  imageValidation,
} = require("../../validations");
const controllers = require("../controllers");
const { isAuth, isAdmin } = require("../../sevices/middlewares");
const multer = require("multer");

router.post(
  "/register",
  isAuth,
  isAdmin,
  multer().none(),
  usernameValidation,
  nameValidation,
  emailValidation,
  passwordValidation,
  controllers.register
);
router.post("/login", passwordValidation, controllers.login);
router.get("/all/", isAuth, isAdmin, controllers.getAllAdmin);
router.get("/:id", isAuth, isAdmin, controllers.getSingelProfile);
router.put(
  "/",
  isAuth,
  isAdmin,
  (req, res, next) => {
    imageValidation(req, res, next, "image");
  },
  (req, res, next) => {
    usernameActiveValidation(req, res, next, "Admin");
  },
  (req, res, next) => {
    emailActiveValidation(req, res, next, "Admin");
  },
  controllers.update
);
router.delete('/:id', isAuth,isAdmin, controllers.deleteAdmin);

module.exports = router;
