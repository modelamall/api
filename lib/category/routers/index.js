const express = require("express");
const { isAuth, isAdmin } = require("../../sevices/middlewares");
const router = express.Router();
const { nameValidation } = require("../../validations");
const controllers = require("../controllers");

router.post("/",isAuth,isAdmin,nameValidation, controllers.create);


module.exports = router;