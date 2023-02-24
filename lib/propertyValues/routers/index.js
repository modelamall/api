const express = require('express');
const { isAdmin, isAuth, isAdminOrStore } = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');
const { propertyValidation, valueValidation } = require("../../validations");


router.post('/', isAuth,isAdmin, propertyValidation, valueValidation, controller.addPropertyValue);
router.put('/:id',isAuth,isAdmin, controller.update);
router.delete('/:id',isAuth,isAdmin, controller.destroy);
router.get('/all',isAuth,isAdminOrStore, controller.getAll);

module.exports = router;
