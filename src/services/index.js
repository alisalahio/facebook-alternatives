const categories = require('./categories/categories.service.js');
const products = require('./products/products.service.js');
const votes = require('./votes/votes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(categories);
  app.configure(products);
  app.configure(votes);
};
