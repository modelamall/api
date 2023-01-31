const express = require("express");
const { isAuth, isStore } = require("../../sevices/middlewares");
const { imageValidation, productCodeValidation, categoryValidation, colorValidation, priceValidation, countValidation, propertiesValidation } = require("../../validations");
const router = express.Router();
const controllers = require("../controllers");

router.post(
  "/",
  isAuth,
  isStore,
  (req, res, next) => {
    imageValidation(req, res, next, "image");
  },
  productCodeValidation,
  categoryValidation,
  colorValidation,
  priceValidation,
  countValidation,
  propertiesValidation,
  controllers.create
);

module.exports = router;
