const express = require('express');
const {isAuth} = require('../../sevices/middlewares');
const router = express.Router();
const controller = require('../controllers');


router.post('/', isAuth, controller.addAddress)
router.put('/:addressid', isAuth, controller.update)
router.delete("/:addressId", isAuth, controller.destroy)
module.exports = router;
