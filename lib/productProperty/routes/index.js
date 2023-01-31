const express = require("express");
const {
  isAuth,
  isAdminOrStore,
  isAdmin,
} = require("../../sevices/middlewares");
const {
  productValidation,
  propertyValueValidation,
} = require("../../validations");
const router = express.Router();
const controller = require("../controllers");

router.get("/", controller.getProductProperty);
router.post(
  "/",
  isAuth,
  isAdminOrStore,
  propertyValueValidation,
  productValidation,
  controller.addProductProperty
);
router.put("/:id", isAuth, isAdmin, controller.putProductProperty);
router.delete("/:id", isAuth, isAdmin, controller.deleteProductProperty);

module.exports = router;
