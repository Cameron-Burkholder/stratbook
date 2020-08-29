/* models/Map.js */

// import Site models
const Site = require("./Site.js");
let sites = [];
const numSites = 4;
for (let i = 0; i < numSites; i++) {
  sites.push(Site());
}

module.exports = Map_ = () => {
  return {
    map_name: "",
    bans: [],
    site_order: [0, 1, 2, 3],
    objectives: sites
  }
}
