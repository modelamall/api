const express = require("express");
const { isAuth, isStore, isAdminOrStore } = require("../../sevices/middlewares");
const { imageValidation, colorValidation, priceValidation, countValidation, productValidation, productVariationValidation } = require("../../validations");
const router = express.Router();
const controllers = require("../controllers");

router.post(
  "/",
  isAuth,
  isStore,
  (req, res, next) => {
    imageValidation(req, res, next, "image", "pictures");
  },
  colorValidation,
  priceValidation,
  countValidation,
  productValidation,
  controllers.create
);

router.get("/product/:id", controllers.getByProductId);
router.get("/:id", controllers.getById);
router.delete(
  "/:id",
  isAuth,
  isAdminOrStore,
  productVariationValidation,
  controllers.deleteProductVariation
);
router.put(
  "/:id",
  isAuth,
  isStore,
  productVariationValidation,
  colorValidation,
  priceValidation,
  countValidation,
  controllers.updateProductVariation
);

module.exports = router;
