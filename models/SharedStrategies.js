/* models/SharedStrategies.js */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
  @schema SharedStrategiesSchema

  @prop maps: Array of MapSchema
  @prop strategies: Array of StrategySchema
  @prop join_code: String
*/
const SharedStrategiesSchema = new Schema({
  team_code: {
    type: String,
    required: true
  },
  shared_key: {
    type: String,
    required: true
  },
  strategy: {
    type: Object,
    required: true
  }
});

module.exports = SharedStrategies = mongoose.model("shared_strategies", SharedStrategiesSchema);
