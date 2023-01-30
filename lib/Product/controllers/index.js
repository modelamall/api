const response = require("../../responses");
const productServices = require("../services");

const create = async (req, res, next) => {
  try {
    var { codeId, categoryId, title, discription, size, price, count, colorId } =
      req.body; 
    const product = await productServices.createProduct({
      codeId,
      categoryId,
      storeId: req.user.id,
      title,
      discription,
      size,
      price,
      count,
      colorId: [ 1, 1 ],
    });
    console.log("vsdvjdsbuvu<çbdvuç<dbvd<v", product);
    if (!product) {
      return response.failedWithMessage("can net created", req, res);
    }
    return response.successWithMessage("Product created successfully", res);
  } catch (err) {

    console.log(err);
    return response.serverError(req, res);
  }
};

module.exports = {
  create,
};
