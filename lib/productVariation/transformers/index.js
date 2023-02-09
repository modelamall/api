const productVariationTransformer = (productVariation) => {
  productVariation?.Pictures.map((picture)=>{
    picture.url = process.env.serverUrl + "/uploads/" + picture.url;
  })
  return productVariation;
};

const productVariationsTransformer = (productVariations) => {
  productVariations?.map((productVariation) => {
    productVariation = productVariationTransformer(productVariation);
  });
  return productVariations;
};
module.exports = {
  productVariationTransformer,
  productVariationsTransformer,
};
