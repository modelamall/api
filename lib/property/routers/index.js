const express = require('express');
const { isAdmin, isAuth, isAdminOrStore } = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');


router.post('/', isAuth,isAdmin, controller.addProperty);
router.put('/:id',isAuth,isAdmin, controller.update);
router.delete('/:id',isAuth,isAdmin, controller.destroy);
router.get('/allproperties',isAuth,isAdminOrStore, controller.getAll);

module.exports = router;
