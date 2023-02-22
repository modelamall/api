const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

const {
  emailValidation,
  nameValidation,
  usernameValidation,
  passwordValidation,
  phoneValidation,
  imageValidation,
  usernameActiveValidation,
  emailActiveValidation,
  phoneActiveValidation,
} = require("../../validations");
const { isAuth, isAdmin, isAdminOrStore, isStore } = require("../../sevices/middlewares");

router.post(
  "/register",
  (req, res, next) => {
    imageValidation(req, res, next, "image");
  },
  emailValidation,
  nameValidation,
  usernameValidation,
  passwordValidation,
  phoneValidation,
  controllers.register
);
router.post("/login", controllers.logIn);
router.get("/all", isAuth, isAdmin, controllers.getAll);
router.get("/:id", isAuth, isAdminOrStore, controllers.index);
router.delete("/:id", isAuth, isAdmin, controllers.destroy);
router.put(
  "/update",
  isAuth,
  isStore,
  (req, res, next) => {
    imageValidation(req, res, next, "image");
  },
  (req, res, next) => {
    usernameActiveValidation(req, res, next, "Store");
  },
  (req, res, next) => {
    emailActiveValidation(req, res, next, "Store");
  },
  (req, res, next) => {
    phoneActiveValidation(req, res, next, "Store");
  },

  nameValidation,
  usernameValidation,
  emailValidation,
  phoneValidation,
  controllers.update
);
module.exports = router;
