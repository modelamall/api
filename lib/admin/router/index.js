const express = require("express");
const router = express.Router();
const { passwordValidation, emailValidation, nameValidation, usernameValidation } = require("../../validations");
const controllers = require("../controllers");


router.post("/register",usernameValidation,nameValidation,emailValidation,passwordValidation, controllers.register);
router.post("/login", controllers.login);


module.exports = router;