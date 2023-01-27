const express = require("express");
const { isAuth, isStore} = require("../../sevices/middlewares");
const router = express.Router();
const controllers = require("../controllers");

router.post("/",isAuth,isStore, controllers.create);


module.exports = router;