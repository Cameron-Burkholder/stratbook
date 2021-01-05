/* models/Team.js */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @schema TeamSchema
  @prop join_code: String
  @props members: Array
  @prop admin: Array
  @prop editors: Array
  @prop blocked_users: Array
  @prop strategies: Array
  @prop name: String
*/
const TeamSchema = new Schema({
  join_code: {
    type: String,
    required: true
  },
  members: {
    type: [String],
    required: true
  },
  admins: {
    type: [String],
    required: true
  },
  editors: {
    type: [String],
    required: true
  },
  blocked_users: {
    type: [String],
    required: true
  },
  strategies_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    required: true
  }
});

module.exports = Team = mongoose.model("teams", TeamSchema);
