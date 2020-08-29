/* models/Site.js */

// import Lineup model
const Strategy = require("./Strategy.js");
let strategies = [];
strategies.push(Strategy());

module.exports = Site = () => {
  return {
    site_name: "",
    strategies: strategies
  }
}
