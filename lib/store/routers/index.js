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
} = require("../../validations");
const { isAuth, isAdmin, isAdminOrStore } = require("../../sevices/middlewares");

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

module.exports = router;
