const fs = require("fs")

const successResponse = function(messages = '', data = [], extras = {}) {
    var response = {
        success: true,
        data ,
        messages,
        time: Date.now(),
    }
    response = {...response, ...extras}
    return response
}

const errorResponse = function(req, messages = [], data = []) {
    if (req?.file?.filename) {
      fs.unlink(`uploads/${req?.file?.filename}`, (err) => {if (err) {
        console.error(err)
      }})
    }
    var response = {
        success: false,
        data,
        messages, 
        time: Date.now()
    }
    return response
}

exports.unauthorized = (req, res) => {
  return res.status(401).json(errorResponse(req, "unauthorized please login !"));
};

exports.unauthenticated = (req, res) => {
  return res
    .status(401)
    .json(errorResponse(req, "unauthenticated, please login first"));
};


exports.failedWithMessage = (msg, req, res) => {
  return res.status(400).json(errorResponse(req, msg));
};

exports.serverError = (req, res) => {
  return res
    .status(500)
    .json(errorResponse(req, "something went wrong, please try again later."));
};

exports.forbidden = (req, res) => {
  return res.status(403).json(errorResponse(req, "forbidden"));
};

exports.notAcceptable = (req, res) => {
  return res.status(406).json(errorResponse(req, "Not Acceptable"));
};

exports.successWithMessage = (msg, res, data=[]) => {
  return res.status(200).json(successResponse(msg, data));
};