/* models/Strategy.js */

// import Setup model
const Setup = require("./Setup.js");
let offense = [];
offense.push(Setup());
let defense = [];
defense.push(Setup());

module.exports = Strategy = () => {
  return {
    offense: offense,
    defense: defense
  }
};
