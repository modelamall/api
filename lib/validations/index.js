const { validationResult, body } = require("express-validator");
const response = require("../responses");
const multer = require("multer");
const { storage, uploadFilter } = require("../sevices/storageService");
const fs = require("fs");
const { getInstanceByNameOrCreate, getInstanceById } = require("../sevices/modelService");

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

const productCodeValidation = async (req, res, next) => {
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
  req.body.codeId = productCode.id
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

const colorValidation = async (req, res, next) => {
  try{
    for(var i = 0; i < req.body?.colorId?.length; i++) {
      const instance = await getInstanceById(+req.body?.colorId[i], "Color");
      console.log(instance)
      if (!instance) {
        return response.failedWithMessage("this color id is not found !", req, res);
      }
    }
    console.log("here")
    next()
  } catch (error) { 

  }
};

const priceValidation = async (req, res, next) => {
  let price = 0;
  req.body.price.map((p, i) => {
    req.body.price[i] = +p;
    if (!(req.body.price[i] > 0)) {
      price++;
    }
  });
  if (price > 0) {
    return response.failedWithMessage(
      "price, you can only enter a number greater than zero !",
      req,
      res
    );
  }
  next()
};

const countValidation = async (req, res, next) => {
  let count = 0;
  req.body.count.map((c, i) => {
    req.body.count[i] = +c;
    if (!(req.body.count[i] > 0)) {
      count++;
    }
  });
  if (count > 0) {
    return response.failedWithMessage(
      "count, you can only enter a number greater than zero !",
      req,
      res
    );
  }
  next()
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
  categoryValidation,
  colorValidation,
  priceValidation,
  countValidation,
  errorResponse,
};
