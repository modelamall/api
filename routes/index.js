var express = require('express');
var router = express.Router();

/* GET home page. */

router.use("/admin", require("../lib/admin/router"));

module.exports = router;
