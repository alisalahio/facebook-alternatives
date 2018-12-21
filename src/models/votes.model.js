// votes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const votes = new Schema({
    ip: { type: String, required: true },
    productId: { type: String, required: true }
  }, {
    timestamps: true
  });

  votes.index({ ip: 1, productId: 1 }, { unique: true });

  return mongooseClient.model('votes', votes);
};
