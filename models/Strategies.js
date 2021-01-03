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
  join_code: {
    type: String,
    required: true
  },
  maps: {
    type: [String],
    require: true
  },
  bank: {
    type: Object,
    require: false
  },
  border: {
    type: Object,
    require: false
  },
  chalet: {
    type: Object,
    require: false
  },
  clubhouse: {
    type: Object,
    required: false
  },
  coastline: {
    type: Object,
    required: false
  },
  consulate: {
    type: Object,
    required: false
  },
  kafe_dostoyevsky: {
    type: Object,
    required: false
  },
  kanal: {
    type: Object,
    required: false
  },
  oregon: {
    type: Object,
    required: false
  },
  skyscraper: {
    type: Object,
    required: false
  },
  theme_park: {
    type: Object,
    required: false
  },
  villa: {
    type: Object,
    required: false
  }
});

module.exports = Strategies = mongoose.model("strategies", StrategiesSchema);
