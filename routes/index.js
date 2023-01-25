var express = require('express');
var router = express.Router();

/* GET home page. */

router.use("/admins", require("../lib/admins/router"));
router.use("/user", require("../lib/user/routers"));
router.use("/store", require("../lib/store/routers"));

module.exports = router;
