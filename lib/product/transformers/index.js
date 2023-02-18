const transformer = require("../../productVariation/transformers");

const productTransformer = (product) => {
  if (product?.Pictures) {
    product?.Pictures.map((picture)=>{
      picture.url = process.env.serverUrl + "/uploads/" + picture.url;
    })
  }
  if (product?.url) {
    product.url = process.env.serverUrl + "/uploads/" + product.url;
  }
  product.ProductVariations = transformer.productVariationsTransformer(product.ProductVariations)
  return product;
};

const productsTransformer = (products) => {
  products?.map((product) => {
    product = productTransformer(product);
  });
  return products;
};
module.exports = {
  productTransformer,
  productsTransformer,
};
