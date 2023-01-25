const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const middlewares = require("../../middlewares");
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
router.post("/login", controllers.login);
router.get("/logout", middlewares.isAuth, controllers.logOut);
router.get(
  "/:id",
  middlewares.isAuth,
  middlewares.isStore,
  controllers.getStore
);
router.put("/me", middlewares.isAuth, controllers.update);
router.delete("/", middlewares.isAuth, controllers.destroy);

module.exports = router;
