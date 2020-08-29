/* models/Setup.js */

// import Lineup model
const Lineup = require("./Lineup");

module.exports = Setup = () => {
  return {
    lineup: Lineup(),
    name: "",
    summary: "",
    description: "",
    backup_plan: "",
  }
}
