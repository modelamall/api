const express = require('express');
const { isAdmin, isAuth } = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');


router.post('/', isAuth,isAdmin, controller.addCity);
//router.put('/:id',isAuth,isAdmin, controller.update);
router.delete('/:id',isAuth,isAdmin, controller.destroy);
router.get('/allcities', controller.getAll);
router.get('/province/:provinceId', controller.getByProvinceId);

module.exports = router;
