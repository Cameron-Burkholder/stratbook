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
    type: Array,
    required: true
  },
  join_code: {
    type: String,
    required: true
  }
});

/*
  @schema StrategySchema

  @prop name: String
  @prop summary: String
  @prop description: String
  @prop backup_plan: String
  @prop lineup: LineupSchema

*/
const StrategySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  backup_plan: {
    type: String,
    required: true
  },
  lineup: {
    type: Object,
    required: true
  }
});

/*
  @schema MapSchema

  @prop bans: Array
  @prop name: String
  @prop site_order: Array
  @prop sites: Array of SiteSchema
*/
const MapSchema = new Schema({
  bans: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  site_order: {
    type: Array,
    required: true
  },
  sites: {
    type: Array,
    required: true
  }
});

/*
  @schema SiteSchema

  @prop site_name: String
  @prop offense: Array of PlanSchema
  @prop defense: Array of PlanSchema
*/
const SiteSchema = new Schema({
  site_name: {
    type: String,
    required: true
  },
  offense: {
    type: Array,
    required: true
  },
  defense: {
    type: Array,
    required: true
  }
});

/*
  @schema PlanSchema

  @prop type: String
  @prop name: String
  @prop summary: String
  @prop description: String
  @prop backup_plan: String
  @prop lineup: LineupSchema
*/
const PlanSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  backup_plan: {
    type: String,
    required: true
  },
  lineup: {
    type: Object,
    required: true
  }
});

/*
  @schema LineupSchema

  @prop roles: Array
  @prop objectives: Array
  @prop operators: Array
*/
const LineupSchema = new Schema({
  roles: {
    type: [String],
    required: true
  },
  objectives: {
    type: [String],
    required: true
  },
  operators: {
    type: [String],
    required: true
  }
});

module.exports = Strategies = mongoose.model("strategies", StrategiesSchema);
