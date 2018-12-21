const { fastJoin, disallow } = require('feathers-hooks-common');

const categoryResolvers = {
  joins: {
    products: () => async (category, context) =>
      (category.products = (await context.app.service('products').find({
        query: {
          categoryId: category._id,
          active: true,
          $sort: { votes: -1 }
        }
      })))
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
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
