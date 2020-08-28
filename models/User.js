/* models/User.js */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @schema UserSchema
  @prop name: String
  @prop email: String
  @prop password: String
*/
const UserSchema = new Schema({
  name: {
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
  }
});

module.exports = User = mongoose.model("users", UserSchema);
