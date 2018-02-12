const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CafeSchema = new Schema({
  avgRating: {
    type: Number,
    default: 0,
    required: false
  },
  externalId: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  address: {
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
const Cafe = mongoose.model("Cafe", CafeSchema);

// Export the model.
module.exports = Cafe;