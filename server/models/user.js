const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pnumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  follows: {
    type: Number,
  },
  followers: {
    type: Number,
  },
  profilePhoto: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
