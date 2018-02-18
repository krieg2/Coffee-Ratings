const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  location: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Creates the model from the above schema.
const User = mongoose.model("User", UserSchema);

// Export the User model.
module.exports = User;