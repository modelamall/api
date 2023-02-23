const express = require("express");
const { isAuth, isAdmin } = require("../../sevices/middlewares");
const router = express.Router();
const { nameValidation, imageValidation, parentValidation, propertyValidation } = require("../../validations");
const controllers = require("../controllers");

router.post(
  "/",
  isAuth,
  isAdmin,
  (req, res, next) => {
    imageValidation(req, res, next, "image");
  },
  parentValidation,
  propertyValidation,
  nameValidation,
  controllers.create)
router.get("/all",isAuth,isAdmin,  controllers.getAll );
router.get("/allcategories", controllers.getAllMain );
router.get("/parents/:id", controllers.getParentsByCategoryId );
router.get("/byparentid/:parentId", controllers.getByParentId )
router.delete("/:id",isAuth,isAdmin, controllers.destroyCategory);


module.exports = router;
