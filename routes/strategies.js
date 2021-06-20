/* routes/strategies.js */

const email = require("../config/email.js");
const { log, genJoinCode, genWordCode, notify } = require("../config/utilities.js");
const mongoose = require("mongoose");
const messages = require("../client/src/messages/messages.js");
const emails = require("../client/src/messages/emails.js");
const { SITES } = require("../client/src/data.js");

// Load input validation
const validation = require("../validation.js");

// Load middleware
const middleware = require("../middleware.js");

// Define roles
const ADMIN = "ADMIN";
const MEMBER = "MEMBER";
const EDITOR = "EDITOR";

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

// Load Strategies model
require("../models/Strategies.js");
const Strategies = require("../models/Strategies.js");

// Load SharedStrategies model
require("../models/SharedStrategies.js");
const SharedStrategies = require("../models/SharedStrategies.js");

// Load Team model
require("../models/Team.js");
const Team = require("../models/Team.js");

module.exports = async (app, passport) => {

  /**
  * Fetch strategies
  * @name /api/strategies/view
  * @function
  * @async
  * @description The user submits a request to view strategies.
  *   If the user is not on the team, this returns a permission denied object.
  *   If the user is able to view the strategies, this returns a strategies found object.
  */
  app.get("/api/strategies/view", (request, response, done) => {
    log("GET REQUEST AT /api/strategies/view");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.members.indexOf(String(request.user._id)) < 0 && request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let strategies;
    try {
      strategies = await Strategies.findOne({ join_code: request.user.team_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_VIEW_STRATEGIES);
    }

    let packet = messages.STRATEGIES_FOUND;
    packet.maps = strategies.maps;
    response.json(packet);
  });

  /**
  * Fetch shared strategy
  * @name /api/strategies/shared/:shared_key
  * @async
  * @description The user submits a request to view a shared strategy
  */
  app.get("/api/strategies/shared/:shared_key", (request, response, done) => {
    log("GET REQUEST AT /api/strategyes/shared/:shared_key");
    done();
  }, async (request, response) => {

    const shared_key = request.params.shared_key;

    if (!shared_key) {
      return response.json(messages.SHARED_STRATEGY_NOT_FOUND);
    }

    let shared_strategy;
    try {
      shared_strategy = await SharedStrategies.findOne({ shared_key: shared_key }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_VIEW_SHARED_STRATEGY);
    }

    if (!shared_strategy) {
      return response.json(messages.SHARED_STRATEGY_NOT_FOUND);
    }

    let packet = messages.SHARED_STRATEGY_FOUND;
    packet.strategy = shared_strategy.strategy;
    response.json(packet);
  });

  /**
  * Fetch a map
  * @name /api/strategies/view/:map
  * @function
  * @async
  * @description The user submits a request to view a specific map.
  *   If the user is not on the team, this returns a permission denied object.
  *   If the strategy is not a part of the team's stratbook, this returns a map not found object.
  *   If the strategy can be found, this returns a map found object.
  * @param {string} request.params.map the map to find
  */
  app.get("/api/strategies/view/:map", (request, response, done) => {
    log("GET REQUEST AT /api/strategies/view/:map");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.members.indexOf(String(request.user._id)) < 0 && request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let strategies;
    try {
      strategies = await Strategies.findOne({ join_code: request.user.team_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_VIEW_MAP);
    }

    if (!strategies[request.params.map.toLowerCase()]) {
      return response.json(messages.MAP_NOT_FOUND);
    }

    let packet = messages.MAP_FOUND;
    packet[request.params.map.toLowerCase()] = strategies[request.params.map.toLowerCase()];
    response.json(packet);
  });

  app.get("/api/strategies/view-shared", (request, response, done) => {
    log("GET REQUEST AT /api/strategies/view-shared");
    done();
  }, async (request, response) => {
    let shared_strategies;
    try {
      shared_strategies = await SharedStrategies.find().exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_VIEW_SHARED_STRATEGIES);
    }

    let index = 0;
    while (index < shared_strategies.length) {
      let team;
      try {
        team = await Team.findOne({ join_code: shared_strategies[index].team_code }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_VIEW_SHARED_STRATEGIES);
      }

      shared_strategies[index].team = team.name;

      index++;
    }

    let packet = messages.SHARED_STRATEGIES_FOUND;
    packet.strategies = shared_strategies;
    return response.json(packet);
  });

  /**
  * Add map to stratbook
  * @name /api/strategies/add/:map
  * @function
  * @async
  * @description The user submits a request to add a map.
  *   If the user is not an editor or admin on the team, this returns a permission denied object.
  *   If the map is already in the stratbook, this returns a map exists object.
  *   If the strategy is able to be added, this returns a map added object.
  * @param {string} request.params.map the map to add the strategy for
  * @param {object} request.body.map the map data to add
  */
  app.post("/api/strategies/add/:map", (request, response, done) => {
    log("POST REQUEST AT /api/strategies/add/:map");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let strategies;
    try {
      strategies = await Strategies.findOne({ join_code: request.user.team_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ADD_MAP);
    }

    if (strategies[request.params.map]) {
      return response.json(messages.MAP_EXISTS);
    }

    strategies[request.params.map] = JSON.parse(request.body.map);
    strategies.maps.push(request.params.map.toLowerCase());
    strategies.maps = strategies.maps.sort();

    try {
      await strategies.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ADD_MAP);
    }

    let index = 0;
    while (index < request.team.admins.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_ADD_MAP);
      }
      notify(user, emails.MAP_ADDED, request.params.map.toUpperCase().replace("_", " "));
      index++;
    }

    response.json(messages.MAP_ADDED);
  });

  /**
  * Share a strategy
  * @name /api/strategies/share
  * @function
  * @async
  * @description The user submits a request to share a strategy
  *   If the user is not an editor or admin on the team, this returns a permission denied object.
  * @param {object} request.body.strategy the strategy to share
  */
  app.post("/api/strategies/share", (request, response, done) => {
    log("POST REQUEST AT /api/strategies/share");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    const strategy = request.body.strategy;

    let shared_key;
    let shared_key_exists;
    do {
      shared_key = genWordCode();
      try {
        shared_key_exists = await SharedStrategies.findOne({ shared_key: shared_key }).exec();
      } catch(error) {
        console.log(error);
        return response.json(messages.PERMISSION_DENIED);
      }
    } while (typeof(shared_key_unique) != "undefined")

    strategy.shared_key = shared_key;

    const newSharedStrategy = new SharedStrategies({
      team_code: request.team.join_code,
      shared_key: shared_key,
      strategy: strategy,
      author: request.user.username
    });

    try {
      newSharedStrategy.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_SHARED_STRATEGY);
    }

    let packet = messages.STRATEGY_SHARED;
    packet.shared_key = shared_key;

    return response.json(messages.STRATEGY_SHARED);

  });

  /**
  * Unshare a strategy
  * @name /api/strategies/unshare
  * @function
  * @async
  * @description The user submits a request to unshare a strategy
  *   If the user is not an editor or admin on the team, this returns a permission denied object.
  *   If the shared strategy cannot be found, this returns a shared strategy not found object.
  * @param {string} request.body.shared_key the key of the strategy to unshare
  */
  app.patch("/api/strategies/unshare", (request, response, done) => {
    log("DELETE REQUEST AT /api/strategies/unshare");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let shared_strategy;

    try {
      shared_strategy = await SharedStrategies.findOne({ shared_key: request.body.shared_key }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UNSHARE_STRATEGY);
    }

    if (!shared_strategy) {
      return response.json(messages.SHARED_STRATEGY_NOT_FOUND);
    }

    try {
      await SharedStrategies.deleteOne({ shared_key: request.body.shared_key }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UNSHARE_STRATEGY);
    }

    return response.json(messages.STRATEGY_UNSHARED);
  });

  /**
  * Update map in Stratbook
  * @name /api/strategies/update/:map
  * @function
  * @async
  * @description The user submits a request to update a specific map.
  *   If the user is not on the team, this returns a permission denied object.
  *   If the strategy does not currently exist in the stratbook, this returns a map does not exist object.
  *   If the map can be updated, this returns a map updated object.
  * @param {string} request.params.map the map to update
  * @param {object} request.body.map the map data to update to
  */
  app.patch("/api/strategies/update/:map", (request, response, done) => {
    log("PATCH REQUEST AT /api/strategies/update/:map");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let strategies;
    try {
      strategies = await Strategies.findOne({ join_code: request.team.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_MAP);
    }

    if (!strategies[request.params.map] || strategies.maps.indexOf(request.params.map) < 0) {
      return response.json(messages.MAP_DOES_NOT_EXIST);
    }

    strategies[request.params.map] = JSON.parse(request.body.map);

    try {
      await strategies.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_MAP);
    }

    let map = JSON.parse(request.body.map);

    let index = 0;

    for (let i = 0; i < 4; i++) {
      index = 0;
      let site = SITES[map.name][i];
      while (index < map.defense[site].length) {
        if (map.defense[site][index].shared) {
          let shared_strategy;
          try {
            shared_strategy = await SharedStrategies.findOne({ shared_key: map.defense[site][index].shared_key }).exec();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_UPDATE_MAP);
          }

          shared_strategy.strategy = map.defense[site][index];
          shared_strategy.author = request.user.username;

          try {
            shared_strategy.save();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_UPDATE_MAP);
          }
        }
        index++;
      }
      index = 0;
      while (index < map.attack[site].length) {
        if (map.attack[site][index].shared) {
          let shared_strategy;
          try {
            shared_strategy = await SharedStrategies.findOne({ shared_key: map.attack[site][index].shared_key }).exec();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_UPDATE_MAP);
          }

          shared_strategy.strategy = map.attack[site][index];
          shared_strategy.author = request.user.username;

          try {
            shared_strategy.save();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_UPDATE_MAP);
          }
        }
        index++;
      }
    }

    response.json(messages.MAP_UPDATED);
  });

  /**
  * Delete map from Stratbook
  * @name /api/strategies/delete/:map
  * @function
  * @async
  * @description The user submits a request to delete a specific map.
  *   If the user is not on the team, this returns a permission denied object.
  *   If the strategy does not currently exist in the stratbook, this returns a map does not exist object.
  *   If the map can be deleted, this returns a map deleted object.
  * @param {string} request.params.map the map to be deleted
  */
  app.delete("/api/strategies/delete/:map", (request, response, done) => {
    log("DELETE REQUEST AT /api/strategies/delete/:map");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    if (request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let strategies;
    try {
      strategies = await Strategies.findOne({ join_code: request.team.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DELETE_MAP);
    }

    if (!strategies[request.params.map] || strategies.maps.indexOf(request.params.map) < 0) {
      return response.json(messages.MAP_DOES_NOT_EXIST);
    }

    let map = strategies[request.params.map];

    let index = 0;

    for (let i = 0; i < 4; i++) {
      index = 0;
      let site = SITES[map.name][i];
      while (index < map.defense[site].length) {
        if (map.defense[site][index].shared) {
          try {
            await SharedStrategies.deleteOne({ shared_key: map.defense[site][index].shared_key }).exec();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_DELETE_MAP);
          }
        }
        index++;
      }
      index = 0;
      while (index < map.attack[site].length) {
        if (map.attack[site][index].shared) {
          try {
            await SharedStrategies.deleteOne({ shared_key: map.attack[site][index].shared_key }).exec();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_DELETE_MAP);
          }
        }
        index++;
      }
    }

    strategies[request.params.map] = undefined;
    strategies.maps.splice(strategies.maps.indexOf(request.params.map), 1);

    try {
      await strategies.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DELETE_MAP);
    }

    index = 0;
    while (index < request.team.admins.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_MAP);
      }
      notify(user, emails.MAP_DELETED, request.params.map.toUpperCase().replace("_", " "));
      index++;
    }

    response.json(messages.MAP_DELETED);

  });
};
