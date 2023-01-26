const { validationResult, body, check } = require("express-validator");
const { failedWithMessage } = require("../responses");
const multer = require("multer");
const { storage, uploadFilter  } = require("../sevices/storageService");
const fs = require("fs")

const errorResponse = (req, res, next) => {
  const msg = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => msg.push(error.msg));
    fs.unlink(`uploads/${req?.file?.filename}`, (err) => {if (err) {
      console.error(err)
    }})
    const errormsg = failedWithMessage(msg, res);
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

let uploadErrors = "";
const checkUpload = (err, next) => {
  if (err instanceof multer.MulterError) {
    uploadErrors = err.message;
  } else if (err) {
    uploadErrors = "file is required to be an image";
  }
  return next();
};

const imageValidation = (req, res, next, fileType, imageType) => {
  const upload = multer({
    storage: storage,
    fileFilter: uploadFilter(fileType),
    limits: { fileSize: 1_000_000 },
  }).single(imageType);
  upload(req, res, (err) => checkUpload(err, next));
};

const pictureValidation = [
  check("image")
    .custom((value, { req }) => {
      if (req?.file) {
        return true;
      }
      return false;
    })
    .withMessage(function () {
      return `The image is invalid: ${uploadErrors?.toLocaleLowerCase()}`;
    })
    .bail(),
  errorResponse,
];
const logoValidation = [
  check("logo")
    .custom((value, { req }) => {
      if (req?.file) {
        return true;
      }
      return false;
    })
    .withMessage(function () {
      return `The logo is invalid: ${uploadErrors?.toLocaleLowerCase()}`;
    })
    .bail(),
  errorResponse,
];
const bannerValidation = [
  check("banner")
    .custom((value, { req }) => {
      if (req?.file) {
        return true;
      }
      return false;
    })
    .withMessage(function () {
      return `The banner image is invalid: ${uploadErrors?.toLocaleLowerCase()}`;
    }),
  errorResponse,
];

module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValidation,
  imageValidation,
  pictureValidation,
  addressValidation,
  logoValidation,
  bannerValidation,
  codeValidation,
  titleValidation,
  usernameValidation,
  genderValidation,
  errorResponse
};
