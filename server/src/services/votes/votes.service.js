// Initializes the `votes` service on path `/votes`
const createService = require('feathers-mongoose');
const createModel = require('../../models/votes.model');
const hooks = require('./votes.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/votes', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('votes');

  service.hooks(hooks);
};
