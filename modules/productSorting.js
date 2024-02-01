module.exports = (productsInJSON, text) => {
  if (text == "asc") {
    productsInJSON.sort((a, b) => a.price - b.price);
  } else {
    productsInJSON.sort((a, b) => b.price - a.price);
  }
};
