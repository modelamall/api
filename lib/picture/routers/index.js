const express = require("express");
const { isAuth, isStore, isAdminOrStore } = require("../../sevices/middlewares");
const { imageValidation, productTypeAndIdValidation, pictureIdValidation } = require("../../validations");
const router = express.Router();
const controllers = require("../controllers");

router.post(
  "/",
  isAuth,
  isStore,
  (req, res, next) => {
    imageValidation(req, res, next, "image", "pictures");
  },
  productTypeAndIdValidation,
  controllers.create
);

router.delete(
  "/:id",
  isAuth,
  isAdminOrStore,
  pictureIdValidation,
  controllers.deletePicture
);


module.exports = router;
