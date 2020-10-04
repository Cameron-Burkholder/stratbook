/* models/Strategies.js */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @schema StrategiesSchema

  @prop maps: Array of MapSchema
  @prop strategies: Array of StrategySchema
  @prop join_code: String
*/
const StrategiesSchema = new Schema({
  strategies: {
    type: Array,
    required: true
  },
  maps: {
    type: Object,
    required: true
  },
  join_code: {
    type: String,
    required: true
  }
});

module.exports = Strategies = mongoose.model("strategies", StrategiesSchema);
