const { fastJoin } = require('feathers-hooks-common');

const categoryResolvers = {
  joins: {
    products: () => async (category, context) =>
      (category.products = (await context.app.service('products').find({
        query: { categoryId: category._id }
      })))
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(categoryResolvers)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
