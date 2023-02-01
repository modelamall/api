const express = require("express");
const router = express.Router();
const { passwordValidation, emailValidation, nameValidation, usernameValidation } = require("../../validations");
const controllers = require("../controllers");
const {isAuth, isAdmin} = require("../../sevices/middlewares");


router.post("/register",usernameValidation,nameValidation,emailValidation,passwordValidation, controllers.register);
router.post("/login",passwordValidation, controllers.login);
router.get("/all/",isAuth, isAdmin, controllers.getAllAdmin);
router.get("/:id",isAuth, isAdmin, controllers.getSingelProfile);


module.exports = router;