// products-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const products = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String },
    votes: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories', required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('products', products);
};
