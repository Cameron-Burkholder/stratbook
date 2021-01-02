/* routes/statistics.js */

const { log, getStats } = require("../config/utilities.js");
const mongoose = require("mongoose");
const { CURRENT_SEASON } = require("../client/src/data.js");
const messages = require("../messages/messages.js");

const middleware = require("../middleware.js");

module.exports = async (app, passport) => {

  /**
  * Get general stats
  * @name /api/statistics/general
  * @function
  * @async
  * @description The user submits a request to get general stats.
  *   If the user cannot be found, this returns a user not found object.
  *   If the stats are found, this returns a general stats found object.
  */
  app.get("/api/statistics/general", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/general");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    const generalStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "generic");
    if (generalStats) {
      let packet = messages.GENERAL_STATS_FOUND;
      packet.stats = generalStats;
      response.json(packet);
    } else {
      response.json(messages.USER_NOT_FOUND);
    }
  });

  /**
  * Get seasonal stats
  * @name /api/statistics/seasonal
  * @function
  * @async
  * @description The user submits a request to get seasonal stats.
  *   If the user cannot be found, this returns a user not found object.
  *   If the stats are found, this returns a seasonal stats found object.
  */
  app.get("/api/statistics/seasonal", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/seasonal");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    const seasonalStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "seasonal");
    if (seasonalStats) {
      let packet = messages.SEASONAL_STATS_FOUND;
      packet.stats = seasonalStats;
      response.json(packet);
    } else {
      response.json(messages.USER_NOT_FOUND);
    }
  });

  /**
  * Get operator stats
  * @name /api/statistics/operator
  * @function
  * @async
  * @description The user submits a request to get operator stats.
  *   If the user cannot be found, this returns a user not found object.
  *   If the stats are found, this returns a operator stats found object.
  */
  app.get("/api/statistics/operators", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/operators");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    const operatorStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "operators");
    if (operatorStats) {
      let packet = messages.OPERATOR_STATS_FOUND;
      packet.stats = operatorStats;
      response.json(packet);
    } else {
      response.json(messages.USER_NOT_FOUND);
    }
  });

  /*
    @route /api/statistics/team
    @method GET

    @outputs:
      If there is an error
        packet: Object (status: ERROR)

      If user has no team
        packet: Object (status: USER_HAS_NO_TEAM)

      If team is not found
        packet: Object (status: TEAM_NOT_FOUND)

      If user is not on team
        packet: Object (status: USER_NOT_QUALIFIED)

      If stats are found
        packet: Object (status: TEAM_STATS_FOUND)
  */
  app.get("/api/statistics/team", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userHasTeam, async (request, response) => {

    if (request.team.members.indexOf(String(request.user._id)) < 0 && request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let size = 0;
    let kd = 0;
    let wl = 0;
    let mmr = 0;
    let mmrchange = 0;
    let level = 0;
    let index = 0;
    let members = [];

    index = 0;
    while (index < request.team.admins.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_TEAM_STATS);
      }

      if (user) {
        const genStats = await getStats(user.username, user.platform, "generic");
        const seasonStats = await getStats(user.username, user.platform, "seasonal");
        if (genStats && seasonStats) {
          let new_user = {
            username: user.username,
            kd: genStats.stats.queue.ranked.kd,
            kills: genStats.stats.queue.ranked.kills,
            deaths: genStats.stats.queue.ranked.deaths,
            wl: genStats.stats.queue.ranked.wl,
            games_played: genStats.stats.queue.ranked.games_played,
            mmr: seasonStats.seasons[CURRENT_SEASON].regions.ncsa[0].mmr,
            mmrchange: seasonStats.seasons[CURRENT_SEASON].regions.ncsa[0].last_match_mmr_change,
            level: genStats.progression.level,
          }
          kd += new_user.kd;
          wl += new_user.wl;
          mmr += new_user.mmr;
          mmrchange += new_user.mmrchange;
          level += new_user.level;
          members.push(new_user);
        }
      }
      size++;
      index++;
    }
    index = 0;
    while (index < request.team.editors.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.editors[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_TEAM_STATS);
      }

      if (user) {
        const genStats = await getStats(user.username, user.platform, "generic");
        const seasonStats = await getStats(user.username, user.platform, "seasonal");
        if (genStats && seasonStats) {
          let new_user = {
            username: user.username,
            kd: genStats.stats.queue.ranked.kd,
            kills: genStats.stats.queue.ranked.kills,
            deaths: genStats.stats.queue.ranked.deaths,
            wl: genStats.stats.queue.ranked.wl,
            games_played: genStats.stats.queue.ranked.games_played,
            mmr: seasonStats.seasons[CURRENT_SEASON].regions.ncsa[0].mmr,
            mmrchange: seasonStats.seasons[CURRENT_SEASON].regions.ncsa[0].last_match_mmr_change,
            level: genStats.progression.level,
          }
          kd += new_user.kd;
          wl += new_user.wl;
          mmr += new_user.mmr;
          mmrchange += new_user.mmrchange;
          level += new_user.level;
          members.push(new_user);
        }
      }
      size++;
      index++;
    }
    index = 0;
    while (index < request.team.members.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.members[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_TEAM_STATS);
      }

      if (user) {
        const genStats = await getStats(user.username, user.platform, "generic");
        const seasonStats = await getStats(user.username, user.platform, "seasonal");
        if (genStats && seasonStats) {
          let new_user = {
            username: user.username,
            kd: genStats.stats.queue.ranked.kd,
            kills: genStats.stats.queue.ranked.kills,
            deaths: genStats.stats.queue.ranked.deaths,
            wl: genStats.stats.queue.ranked.wl,
            games_played: genStats.stats.queue.ranked.games_played,
            mmr: seasonStats.seasons[CURRENT_SEASON].regions.ncsa[0].mmr,
            mmrchange: seasonStats.seasons[CURRENT_SEASON].regions.ncsa[0].last_match_mmr_change,
            level: genStats.progression.level,
          }
          kd += new_user.kd;
          wl += new_user.wl;
          mmr += new_user.mmr;
          mmrchange += new_user.mmrchange;
          level += new_user.level;
          members.push(new_user);
        }
      }
      size++;
      index++;
    }

    kd = Math.round((kd / size) * 100) / 100;
    wl = Math.round((wl / size) * 100) / 100;
    mmr = Math.round((mmr / size) * 100) / 100;
    mmrchange = Math.round((mmrchange / size) * 100) / 100;
    level = Math.round((level / size) * 100) / 100;
    let packet = messages.TEAM_STATS_FOUND;
    packet.team = members;
    packet.kd = kd;
    packet.wl = wl;
    packet.mmr = mmr;
    packet.mmrchange = mmrchange;
    packet.level = level;
    response.json(packet);
  });
}
