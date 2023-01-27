const express = require('express');
const { isAdmin, isAuth } = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');


router.post('/', isAuth,isAdmin, controller.addProvince);
//router.get('/', controller.getProvinces);

module.exports = router;
