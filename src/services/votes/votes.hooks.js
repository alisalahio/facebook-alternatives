const { disallow } = require('feathers-hooks-common');

function updateVotesCount() {
  return function(hook) {
    hook.app
      .service('products')
      .patch(hook.data.productId, { $inc: { votes: 1 } });
  };
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateVotesCount()],
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
