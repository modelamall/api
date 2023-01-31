const express = require('express');
const { isAdmin, isAuth, isUser, isStore } = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');


router.post('/', isAuth, controller.addAddress)
/* router.put('/', isAuth, isAdmin, controller.update)
router.delete('/:id',isAuth,isAdmin, controller.destroy)
router.get('/allcities', controller.getAll) */
module.exports = router;
