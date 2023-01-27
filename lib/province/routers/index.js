const express = require('express');
const { isAdmin, isAuth } = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');


router.post('/', isAuth,isAdmin, controller.addProvince);
router.put('/:id',isAuth,isAdmin, controller.update);
router.delete('/:id',isAuth,isAdmin, controller.destroy);
router.get('/allprovinces', controller.getAll);

module.exports = router;
