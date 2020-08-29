/* models/Strategies.js */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @schema UserSchema
  @prop username: String
  @prop email: String
  @prop password: String
  @prop platform: String
  @prop team_code: String
  @prop status: String
  @prop verified: Boolean
*/
const StrategiesSchema = new Schema({
  strategies: {
    type: Array,
    required: true
  }
});

module.exports = Strategies = mongoose.model("strategies", StrategiesSchema);
