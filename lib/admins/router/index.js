const express = require("express");
const router = express.Router();
const middlewares = require("../../sevices/middlewares");
const { passwordValidation, emailValidation, nameValidation } = require("../../validations");
const controllers = require("../controllers");


router.post("/register",nameValidation,emailValidation,passwordValidation, controllers.register);


module.exports = router;