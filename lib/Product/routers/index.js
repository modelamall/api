const express = require("express");
const { isAuth, isStore } = require("../../sevices/middlewares");
const {
  imageValidation,
  productCodeValidation,
  categoryValidation,
  colorsValidation,
  pricesValidation,
  countsValidation,
  propertiesValidation,
  productCodeCreateValidation,
  storeValidation,
} = require("../../validations");
const router = express.Router();
const controllers = require("../controllers");

router.post(
  "/",
  isAuth,
  isStore,
  (req, res, next) => {
    imageValidation(req, res, next, "image");
  },
  productCodeCreateValidation,
  categoryValidation,
  colorsValidation,
  pricesValidation,
  countsValidation,
  propertiesValidation,
  controllers.create
);
router.get("/all", controllers.getAllProduct);
router.get("/:id", controllers.getProductById);
router.get("/productcode/:code",productCodeValidation, controllers.getProductByProductCode);
router.get("/store/:id", storeValidation, controllers.getProductByStoreId);
router.get("/title/:text", controllers.getProductByTitle);
router.post("/filter", controllers.getProductByPropertyValueId);

module.exports = router;
