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
      return failedWithMessage(err.message, req, res);
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
  for (let i = 0; i < req.body.propertyValue.length; i++) {
    req.body.propertyIndex[i] = +req.body.propertyIndex[i];
    req.body.propertyValue[i] = +req.body.propertyValue[i];
    console.log(req.body.propertyIndex[i], req.body.propertyValue[i]);
    const index = await getInstanceById(req.body.propertyIndex[i], "Property");
    const value = await getInstanceById(
      req.body.propertyValue[i],
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
  next();
};

const propertyValueValidation = async (req, res, next) => {
  const propertyValue = await getInstanceById(
    req.body.propertyValueId,
    "PropertiesValue"
  );
  if (propertyValue) {
    next();
  }
  return response.failedWithMessage("Property value is not found !", req, res);
};

const productValidation = async (req, res, next) => {
  req.body.productId = +req.body.productId
  const product = await getInstanceById(req.body.productId, "Product");
  if (product) {
    if (product.storeId === req.user.id) {
      next();
    }
    else return response.failedWithMessage("Product is not your !", req, res);
  }
  else return response.failedWithMessage("Product is not found !", req, res);
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
  } else return response.failedWithMessage("Username is used before !", req, res);
};

const emailActiveValidation = async (req, res, next, modelName) => {
  const email = await getInstanceByText(
    "email",
    req.body.email,
    modelName
  );
  if (!email || email?.id == req.user.id) {
    next();
  } else return response.failedWithMessage("Email is used before !", req, res);
};

const phoneActiveValidation = async (req, res, next, modelName) => {
  const phone = await getInstanceByText(
    "phone",
    req.body.phone,
    modelName
  );
  if (!phone || phone?.id == req.user.id) {
    next();
  } else return response.failedWithMessage("phone is used before !", req, res);
};

const colorValidation = async (req, res, next) => {
  try {
    req.body.colorId = +req.body.colorId;
    const instance = await getInstanceById(req.body.colorId, "Color");
    if (!instance) {
      return response.failedWithMessage(
        "this color id is not found !",
        req,
        res
      );
    }
    next();
  } catch (error) {}
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
  productCodeValidation,
  productCodeCreateValidation,
  categoryValidation,
  colorsValidation,
  pricesValidation,
  countsValidation,
  colorValidation,
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
  errorResponse,
};
