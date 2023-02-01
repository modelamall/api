const response = require("../../responses");
const {
  getInstanceById,
  getInstanceByNameOrCreate,
} = require("../../sevices/modelService");
const productVariationServices = require("../services");

const create = async (req, res, next) => {
  try {
    const {
      code,
      categoryId,
      title,
      discription,
      size,
      price,
      count,
      colorId,
    } = req.body;
    const productCode = await getInstanceByNameOrCreate(
      (nameIndex = "code"),
      code,
      "ProductCode"
    );
    if (productCode) {
      console.log(+categoryId);
      const category = await getInstanceById(+categoryId, "Category");
      if (category) {
        const product = await productServices.createProduct({
          codeId: productCode.id,
          categoryId,
          storeId: req.user.id,
          title,
          discription,
        });
        // var color = null;
        // productVariations.map(async (PV) => {
        //   if (typeof PV.color === "number" && PV.color > 0) {
        //     color = await getInstanceById(PV.color, "Color");
        //   } else {
        //     color = await createColor(PV.color);
        //   }
        //   if (color) {
        //     const productVariation =
        //       await productServices.createProductVariation({
        //         size: PV.size,
        //         price: PV.price,
        //         count: PV.count,
        //         productId: product.id,
        //         colorId: color.id,
        //       });
        //   }
        // });
      } else
        return response.failedWithMessage(
          "this category id is not found !",
          req,
          res
        );
    } else
      return response.failedWithMessage(
        "this product code id is not found !",
        req,
        res
      );

    return response.successWithMessage("Product created successfully", res);
  } catch (err) {
    return response.serverError(req, res);
  }
};

const getByProductId = async (req, res, next) => {
  try {
    const id = +req.params.id
    const productVariation = await productVariationServices.getByProductId({id});
    if (!productVariation) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, productVariation);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
}

const getById = async (req, res, next) => {
  try {
    const id = +req.params.id
    const productVariation = await productVariationServices.getById({id});
    if (!productVariation) {
      return response.failedWithMessage("Not found !", req, res);
    }
    return response.successWithMessage("Successfully", res, productVariation);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(req, res);
  }
}

module.exports = {
  create,
  getByProductId,
  getById,
};
