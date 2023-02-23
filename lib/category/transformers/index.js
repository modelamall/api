const categoryTransformer = (category) => {
  category.icon = process.env.serverUrl + "/uploads/" + category.icon;
  return category;
};

const categoriesTransformer = (categories) => {
  categories.map((category)=> {
    category.icon = process.env.serverUrl + "/uploads/" + category.icon;
  })
  return categories
};
module.exports = {
  categoryTransformer,
  categoriesTransformer
};
