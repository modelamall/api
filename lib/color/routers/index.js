const express = require("express");
const { isAuth, isAdmin } = require("../../sevices/middlewares");
const router = express.Router();
const controller = require("../controllers");

router.get('/',controller.getColor);
router.post('/', isAuth,isAdmin, controller.addColor);
router.put('/:id', isAuth,isAdmin, controller.putColor);
router.delete('/:id', isAuth,isAdmin, controller.deleteColor);

module.exports = router;