const { validationResult, body } = require("express-validator");
const response = require("../responses");
const multer = require("multer");
const { storage, uploadFilter } = require("../sevices/storageService");
const fs = require("fs");
const {
  getInstanceByNameOrCreate,
  getInstanceById,
  getInstanceByText,
} = require("../sevices/modelService");

const errorResponse = (req, res, next) => {
  const msg = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => msg.push(error.msg));
    if (fs.existsSync(`uploads/${req?.file?.filename}`)) {
      fs.unlinkSync(`uploads/${req?.file?.filename}`);
    }
    const errormsg = response.failedWithMessage(msg, req, res);
    return res.send(errormsg);
  }
  return next();
};

const nameValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for the name")
    .escape()
    .notEmpty()
    .withMessage("Name can not be empty!")
    .bail(),
  errorResponse,
];
const valueValidation = [
  body("value")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for the value")
    .escape()
    .notEmpty()
    .withMessage("Value can not be empty!")
    .bail(),
  errorResponse,
];
const usernameValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .matches(/^[a-zA-Z0-9._]+$/)
    .withMessage("Minimum 3 characters required for the username ")
    .escape()
    .notEmpty()
    .withMessage("User name can not be empty!")
    .bail(),
  errorResponse,
];

const titleValidation = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Required characters for the title are between 3 and 255!")
    .escape()
    .notEmpty()
    .withMessage("title can not be empty!")
    .bail(),
  errorResponse,
];

const descriptionValidation = [
  body("description")
    .trim()
    .isLength({ min: 30 })
    .withMessage("Required characters for the description is minimum 30!")
    .escape()
    .notEmpty()
    .withMessage("description can not be empty!")
    .bail(),
  errorResponse,
];

const emailValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("errors.email")
    .notEmpty()
    .withMessage("errors.email")
    .bail(),
  errorResponse,
];
const genderValidation = [
  body("gender").isBoolean().withMessage("Gender should be 0 or 1!").bail(),
  errorResponse,
];
const passwordValidation = [
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .withMessage(
      "Password should be at least 6 charaters and contains capital, small ,numbers and spical charaters"
    )
    .notEmpty()
    .withMessage("Password can not be empty!"),
  errorResponse,
];
const phoneValidation = [
  body("phone")
    .isLength({ min: 6 })
    .optional({ nullable: true })
    .withMessage("Minimum 6 characters required for the phone!"),
  errorResponse,
];
const codeValidation = [
  body("code")
    .trim()
    .isLength({ max: 3 })
    .withMessage("Maximum 3 characters required for the code")
    .escape()
    .notEmpty()
    .withMessage("code can not be empty!")
    .bail(),
  errorResponse,
];
const addressValidation = [
  body("address")
    .isLength({ max: 250 })
    .optional({ nullable: true })
    .withMessage("Maxmium 250 characters required for the address!"),
  errorResponse,
];

const imageValidation = (req, res, next, fileType) => {
  const upload = multer({
    storage: storage,
    fileFilter: uploadFilter(fileType),
    limits: { fileSize: 1_000_000 },
  }).any();
  upload(req, res, (err) => {
    if (err) {
      return response.failedWithMessage(err.message, req, res);
    }
    next();
  });
};

const productCodeCreateValidation = async (req, res, next) => {
  const productCode = await getInstanceByNameOrCreate(
    "code",
    req.body.code,
    "ProductCode"
  );
  if (!productCode) {
    return response.failedWithMessage(
      "this product code id is not found !",
      req,
      res
    );
  }
  req.body.codeId = productCode.id;
  next();
};

const categoryValidation = async (req, res, next) => {
  req.body.categoryId = +req.body.categoryId;
  const category = await getInstanceById(req.body.categoryId, "Category");
  if (!category) {
    return response.failedWithMessage(
      "this category id is not found !",
      req,
      res
    );
  }
  next();
};

const colorsValidation = async (req, res, next) => {
  try {
    for (var i = 0; i < req.body?.colorId?.length; i++) {
      req.body.colorId[i] = +req.body.colorId[i];
      const instance = await getInstanceById(req.body.colorId[i], "Color");
      if (!instance) {
        return response.failedWithMessage(
          `this color id ${i} is not found !`,
          req,
          res
        );
      }
    }
    next();
  } catch (error) {}
};

const pricesValidation = async (req, res, next) => {
  for (let i = 0; i < req.body.price.length; i++) {
    req.body.price[i] = +req.body.price[i];
    if (!(req.body.price[i] > 0)) {
      return response.failedWithMessage(
        `price ${i}, you can only enter a number greater than zero !`,
        req,
        res
      );
    }
  }
  next();
};

const countsValidation = async (req, res, next) => {
  for (let i = 0; i < req.body.count.length; i++) {
    req.body.count[i] = +req.body.count[i];
    if (!(req.body.count[i] > 0)) {
      return response.failedWithMessage(
        `count ${i}, you can only enter a number greater than zero !`,
        req,
        res
      );
    }
  }
  next();
};

const propertiesValidation = async (req, res, next) => {
  for (let i = 0; i < req.body?.propertyValue?.length; i++) {
    for (let j = 0; j < req.body?.propertyValue[i]?.length; j++) {
      req.body.propertyIndex[i][j] = +req.body.propertyIndex[i][j];
      req.body.propertyValue[i][j] = +req.body.propertyValue[i][j];
      const index = await getInstanceById(
        req.body.propertyIndex[i][j],
        "Property"
      );
      const value = await getInstanceById(
        req.body.propertyValue[i][j],
        "PropertiesValue"
      );
      if (!index || !value) {
        return response.failedWithMessage(
          "Property or property value are not found !",
          req,
          res
        );
      }
    }
  }
  next();
};

const propertyValueValidation = async (req, res, next) => {
  const propertyValue = await getInstanceById(
    +req.body.propertyValueId,
    "PropertiesValue"
  );
  if (!propertyValue) {
    return response.failedWithMessage("Property value is not found !", req, res);
  }
  next()
};

const productValidation = async (req, res, next) => {
  req.body?.productId
    ? (req.body.productId = +req.body.productId)
    : (req.body.productId = +req.params.id);
  const product = await getInstanceById(req.body.productId, "Product");
  if (product) {
    if (
      req.user.type == "Admin" ||
      (product.storeId === req.user.id && req.user.type == "Store")
    ) {
      next();
    } else return response.failedWithMessage("Product is not your !", req, res);
  } else return response.failedWithMessage("Product is not found !", req, res);
};

const productVariationValidation = async (req, res, next) => {
  req.body?.productVariationId
  ? (req.body.productVariationId = +req.body.productVariationId)
  : (req.body.productVariationId = +req.params.id);
  const productVariation = await getInstanceById(
    req.body.productVariationId,
    "ProductVariation"
  );
  if (productVariation) {
    req.body.productId = productVariation.productId;
    productValidation(req, res, next);
  } else
    return response.failedWithMessage(
      "Product Variation is not found !",
      req,
      res
    );
};

const parentValidation = async (req, res, next) => {
  const parentId = req.body?.parentId ? +req.body.parentId : null;
  req.body.parentId = parentId;
  if (parentId) {
    const parent = await getInstanceById(parentId, "Category");
    if (!parent) {
      return response.failedWithMessage(
        "Main category id is not found !",
        req,
        res
      );
    }
  }
  next();
};

const propertyValidation = async (req, res, next) => {
  for (var i = 0; i < req.body?.filter?.length; i++) {
    req.body.filter[i] = +req.body.filter[i];
    const instance = await getInstanceById(req.body.filter[i], "Property");
    if (!instance) {
      return response.failedWithMessage(
        `this property id ${i} is not found !`,
        req,
        res
      );
    }
  }
  if (req.body?.propertyId) {
    const instance = await getInstanceById(+req.body.propertyId, "Property");
    if (!instance) {
      return response.failedWithMessage(
        `This property is not found !`,
        req,
        res
      );
    }
  }
  next();
};

const productCodeValidation = async (req, res, next) => {
  const productCode = await getInstanceByText(
    "code",
    req.params.code,
    "ProductCode"
  );
  if (!productCode) {
    return response.failedWithMessage("Not found !", req, res);
  }
  req.productCodeId = productCode.id;
  next();
};

const storeValidation = async (req, res, next) => {
  const store = await getInstanceById(+req.params.id, "Store");
  if (!store) {
    return response.failedWithMessage("Not found !", req, res);
  }
  req.storeId = store.id;
  next();
};

const usernameActiveValidation = async (req, res, next, modelName) => {
  const username = await getInstanceByText(
    "username",
    req.body.username,
    modelName
  );
  if (!username || username?.id == req.user.id) {
    next();
  } else
    return response.failedWithMessage("Username is used before !", req, res);
};

const emailActiveValidation = async (req, res, next, modelName) => {
  const email = await getInstanceByText("email", req.body.email, modelName);
  if (!email || email?.id == req.user.id) {
    next();
  } else return response.failedWithMessage("Email is used before !", req, res);
};

const phoneActiveValidation = async (req, res, next, modelName) => {
  const phone = await getInstanceByText("phone", req.body.phone, modelName);
  if (!phone || phone?.id == req.user.id) {
    next();
  } else return response.failedWithMessage("phone is used before !", req, res);
};

const priceValidation = async (req, res, next) => {
  req.body.price = +req.body.price;
  if (!(req.body.price > 0)) {
    return response.failedWithMessage(
      "price, you can only enter a number greater than zero !",
      req,
      res
    );
  }

  next();
};

const countValidation = async (req, res, next) => {
  req.body.count = +req.body.count;
  if (!(req.body.count > 0)) {
    return response.failedWithMessage(
      "count, you can only enter a number greater than zero !",
      req,
      res
    );
  }

  next();
};

const pictureIdValidation = async (req, res, next) => {
  req.body.pictureId = +req.params.id;
  const picture = await getInstanceById(req.body.pictureId, "Picture");
  if (picture) {
    req.params.id = picture?.pictureableId;
    if (picture?.pictureableType == "ProductVariation") {
      productVariationValidation(req, res, next);
    } else if (picture?.pictureableType == "Product") {
      productValidation(req, res, next);
    }
  } else return response.failedWithMessage("Picture is not found !", req, res);
};

const productTypeAndIdValidation = async (req, res, next) => {
  req.body.pictureableId = +req.body.pictureableId;
  req.params.id = req.body.pictureableId;
  if (req.body.pictureableType == "ProductVariation") {
    productVariationValidation(req, res, next);
  } else if (req.body.pictureableType == "Product") {
    productValidation(req, res, next);
  } else
    return response.failedWithMessage(
      "Picture type is not correct !",
      req,
      res
    );
};

module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  imageValidation,
  addressValidation,
  codeValidation,
  titleValidation,
  usernameValidation,
  genderValidation,
  valueValidation,
  productCodeValidation,
  productCodeCreateValidation,
  categoryValidation,
  colorsValidation,
  pricesValidation,
  countsValidation,
  priceValidation,
  countValidation,
  propertiesValidation,
  propertyValueValidation,
  productValidation,
  parentValidation,
  propertyValidation,
  storeValidation,
  usernameActiveValidation,
  emailActiveValidation,
  phoneActiveValidation,
  productVariationValidation,
  pictureIdValidation,
  productTypeAndIdValidation,
  descriptionValidation,
  errorResponse,
};
