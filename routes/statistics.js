/* routes/statistics.js */

const { log, getStats } = require("../config/utilities.js");
const mongoose = require("mongoose");

const middleware = require("../middleware.js");

module.exports = async (app, passport) => {
  /*
    @route /api/statistics/general
    @method GET

    @outputs:
      If there is an error
        packet: Object (status: ERROR)

      If user is not found in stats database
        packet: Object (status: USER_NOT_FOUND)

      If stats are found
        packet: Object (status: GENERAL_STATS_FOUND, stats)
  */
  app.get("/api/statistics/general", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/general");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    const generalStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "generic");
    if (generalStats) {
      response.json({
        status: "GENERAL_STATS_FOUND",
        stats: generalStats
      });
    } else {
      response.json({
        status: "USER_NOT_FOUND"
      });
    }
  });

  /*
    @route /api/statistics/seasonal
    @method GET

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_GETTING_SEASONAL_STATS)

      If user is not found in stats database
        packet: Object (status: USER_NOT_FOUND)

      If stats are found
        packet: Object (status: SEASONAL_STATS_FOUND, stats)
  */
  app.get("/api/statistics/seasonal", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/seasonal");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let packet = {
      status: ""
    };
    const seasonalStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "seasonal");
    if (seasonalStats) {
      response.json({
        status: "SEASONAL_STATS_FOUND",
        stats: seasonalStats
      });
    } else {
      response.json({
        status: "USER_NOT_FOUND"
      });
    }
  });

  /*
    @route /api/statistics/operators
    @method GET

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_GETTING_OPERATOR_STATS)

      If user is not found in stats database
        packet: Object (status: USER_NOT_FOUND)

      If stats are found
        packet: Object (status: OPERATOR_STATS_FOUND, stats)
  */
  app.get("/api/statistics/operators", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/operators");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    const operatorStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "operators");
    if (operatorStats) {
      response.json({
        status: "OPERATOR_STATS_FOUND",
        stats: operatorStats
      });
    } else {
      response.json({
        status: "USER_NOT_FOUND"
      });
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
    if (request.team.members.indexOf(String(request.user._id)) >= 0 || request.team.editors.indexOf(String(request.user._id)) >= 0 || request.team.admins.indexOf(String(request.user._id)) >= 0) {
      let size = 0;
      let kd = 0;
      let wl = 0;
      let mmr = 0;
      let mmrchange = 0;
      let level = 0;
      let index = 0;
      let members = [];
      while (index < request.team.admins.length) {
        await new Promise(async (resolve, reject) => {
          User.findOne({ _id: mongoose.Types.ObjectId(request.team.admins[index]) }).then(async (user) => {
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
                  mmr: seasonStats.seasons.shadow_legacy.regions.ncsa[0].mmr,
                  mmrchange: seasonStats.seasons.shadow_legacy.regions.ncsa[0].last_match_mmr_change,
                  level: genStats.progression.level,
                }
                kd += new_user.kd;
                wl += new_user.wl;
                mmr += new_user.mmr;
                mmrchange += new_user.mmrchange;
                level += new_user.level;
                members.push(new_user);
              }
              resolve(true);
            } else {
              reject(false);
            }
          }).catch(error => {
            console.log(error);
            response.json({
              status: "ERROR",
              message: "An error occurred while getting statistics for a member of the team."
            });
            return reject(false);
          })
        });
        size++;
        index++;
      }
      index = 0;
      while (index < request.team.editors.length) {
        await new Promise(async (resolve, reject) => {
          User.findOne({ _id: mongoose.Types.ObjectId(request.team.editors[index]) }).then(async (user) => {
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
                  mmr: seasonStats.seasons.shadow_legacy.regions.ncsa[0].mmr,
                  mmrchange: seasonStats.seasons.shadow_legacy.regions.ncsa[0].last_match_mmr_change,
                  level: genStats.progression.level,
                }
                kd += new_user.kd;
                wl += new_user.wl;
                mmr += new_user.mmr;
                mmrchange += new_user.mmrchange;
                level += new_user.level;
                members.push(new_user);
              }
              resolve(true);
            } else {
              reject(false);
            }
          }).catch(error => {
            console.log(error);
            response.json({
              status: "ERROR",
              message: "An error occurred while getting statistics for a member of the team."
            });
            return reject(false);
          })
        });
        size++;
        index++;
      }
      index = 0;
      while (index < request.team.members.length) {
        await new Promise(async (resolve, reject) => {
          User.findOne({ _id: mongoose.Types.ObjectId(request.team.members[index]) }).then(async (user) => {
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
                  mmr: seasonStats.seasons.shadow_legacy.regions.ncsa[0].mmr,
                  mmrchange: seasonStats.seasons.shadow_legacy.regions.ncsa[0].last_match_mmr_change,
                  level: genStats.progression.level,
                }
                kd += new_user.kd;
                wl += new_user.wl;
                mmr += new_user.mmr;
                mmrchange += new_user.mmrchange;
                level += new_user.level;
                members.push(new_user);
              }
              resolve(true);
            } else {
              reject(false);
            }
          }).catch(error => {
            console.log(error);
            response.json({
              status: "ERROR",
              message: "An error occurred while getting statistics for a member of the team."
            });
            return reject(false);
          })
        });
        size++;
        index++;
      }

      kd = Math.round((kd / size) * 100) / 100;
      wl = Math.round((wl / size) * 100) / 100;
      mmr = Math.round((mmr / size) * 100) / 100;
      mmrchange = Math.round((mmrchange / size) * 100) / 100;
      level = Math.round((level / size) * 100) / 100;
      response.json({
        team: members,
        status: "TEAM_STATS_FOUND",
        kd: kd,
        wl: wl,
        mmr: mmr,
        mmrchange: mmrchange,
        level: level
      });
    } else {
      response.json({
        status: "USER_NOT_QUALIFIED",
        message: "The user is not on the requested team."
      });
    }
  });
}
