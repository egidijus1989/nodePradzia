module.exports = (productsInJSON, text) => {
  const queryResult = [];
  for (let product of productsInJSON) {
    if (product.productName.toLowerCase().includes(text.toLowerCase())) {
      queryResult.push(product);
    }
  }
  return queryResult;
};
