const express = require("express");
const { isAuth, isAdminOrStore } = require("../../sevices/middlewares");
const router = express.Router();
const controllers = require("../controllers");

router.post("/",isAuth,isAdminOrStore, controllers.create);


module.exports = router;