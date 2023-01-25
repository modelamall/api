var express = require('express');
var router = express.Router();

/* GET home page. */

router.use("/admins", require("../lib/admins/router"));

module.exports = router;
