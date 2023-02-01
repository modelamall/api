const express = require("express");
const { isAuth, isStore } = require("../../sevices/middlewares");
const { imageValidation } = require("../../validations");
const router = express.Router();
const controllers = require("../controllers");

router.post(
  "/",
  isAuth,
  isStore,
  (req, res, next) => {
    imageValidation(req, res, next, "image", "pictures");
  },
  controllers.create
);

router.get("/product/:id", controllers.getByProductId);
router.get("/:id", controllers.getById);

module.exports = router;
