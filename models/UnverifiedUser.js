/* models/UnverifiedUser.js */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @schema UnverifiedUserSchema
  @prop user_id: ObjectID
  @prop verification_link: String
*/
const UnverifiedUserSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  verification_id: {
    type: String,
    required: true
  }
});

module.exports = UnverifiedUser = mongoose.model("unverified_users", UnverifiedUserSchema);
