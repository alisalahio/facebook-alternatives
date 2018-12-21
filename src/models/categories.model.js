// categories-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const categories = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    color: { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('categories', categories);
};
