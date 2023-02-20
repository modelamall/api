const express = require("express");
const multer = require("multer");
const {
  isAuth,
  isStore,
  isAdminOrStore,
} = require("../../sevices/middlewares");
const {
  imageValidation,
  productCodeValidation,
  categoryValidation,
  pricesValidation,
  countsValidation,
  propertiesValidation,
  productCodeCreateValidation,
  storeValidation,
  productValidation,
  titleValidation,
  descriptionValidation,
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
  titleValidation,
  descriptionValidation,
  pricesValidation,
  countsValidation,
  propertiesValidation,
  controllers.create
);
router.get("/all", controllers.getAllProduct);
router.get("/:id", controllers.getProductById);
router.get(
  "/productcode/:code",
  productCodeValidation,
  controllers.getProductByProductCode
);
router.get("/store/:id", storeValidation, controllers.getProductByStoreId);
router.get("/title/:text", controllers.getProductByTitle);
router.post("/filter", multer().none(), controllers.getProductByPropertyValueId);
router.delete(
  "/:id",
  isAuth,
  isAdminOrStore,
  productValidation,
  controllers.deleteProduct
);
router.put(
  "/:id",
  isAuth,
  isStore,
  productValidation,
  productCodeCreateValidation,
  controllers.updateProduct
);

module.exports = router;
