var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Creates the model from the above schema.
var User = mongoose.model("User", Schema);

// Export the User model.
module.exports = User;