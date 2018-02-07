const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  avgRating: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  upc: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // The ref property links the ObjectId to the Review model.
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]

});

// Creates the model from the above schema.
const Product = mongoose.model("Product", ProductSchema);

// Export the User model.
module.exports = Product;