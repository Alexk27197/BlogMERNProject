const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Number,
    default: 0,
    enum: [0, 1, "Value should be either 0 or 1"],
  },
  userAvatar: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
