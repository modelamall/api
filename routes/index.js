var express = require('express');
var router = express.Router();

/* GET home page. */

router.use("/admin", require("../lib/admin/routers"));
router.use("/user", require("../lib/user/routers"));
router.use("/store", require("../lib/store/routers"));
router.use("/category", require("../lib/category/routers"));
router.use("/productCode", require("../lib/productCode/routers"));
router.use("/product", require("../lib/product/routers"));
router.use("/productvariation", require("../lib/productVariation/routers"));
router.use("/province", require("../lib/province/routers"));
router.use("/city", require("../lib/city/routers"));
router.use("/color", require("../lib/color/routers"));
router.use("/address", require("../lib/address/routers"));
router.use("/filter", require("../lib/filter/routers"));
router.use("/property", require("../lib/property/routers"));
router.use("/picture", require("../lib/picture/routers"));
router.use("/productProperty", require("../lib/productProperty/routers"));


module.exports = router;
