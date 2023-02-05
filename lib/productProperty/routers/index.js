
const express = require("express");
const {
  isAuth,
  isAdmin,
  isStore,
} = require("../../sevices/middlewares");
const {
  propertyValueValidation,
  productVariationValidation,
} = require("../../validations");
const router = express.Router();
const controller = require("../controllers");

router.post(
  "/",
  isAuth,
  isStore,
  propertyValueValidation,
  productVariationValidation,
  controller.addProductProperty
);
router.put("/:id", isAuth, isStore, controller.updateProductProperty);
router.delete("/:id", isAuth, isStore, controller.deleteProductProperty);

module.exports = router;
