module.exports = (productsInJSON) => {
  return productsInJSON.reduce((cheap, expensive) =>
    cheap.price < expensive.price ? cheap : expensive
  );
};
