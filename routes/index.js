var express = require('express');
var router = express.Router();

/* GET home page. */

router.use("/admin", require("../lib/admin/routers"));
router.use("/user", require("../lib/user/routers"));
router.use("/store", require("../lib/store/routers"));
router.use("/category", require("../lib/category/routers"));
router.use("/productCode", require("../lib/productCode/routers"));

module.exports = router;
