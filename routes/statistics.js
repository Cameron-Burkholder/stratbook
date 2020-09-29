/* routes/statistics.js */

const { log, getStats } = require("../config/utilities.js");
const mongoose = require("mongoose");

module.exports = async (app, passport) => {
  /*
    @route /api/statistics/general
    @method GET

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_GETTING_GENERAL_STATS)

      If user is not found in stats database
        packet: Object (status: USER_NOT_FOUND)

      If stats are found
        packet: Object (status: GENERAL_STATS_FOUND, stats)
  */
  app.get("/api/statistics/general", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/general");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let packet = {
      status: ""
    };
    const generalStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "generic");
    if (generalStats) {
      packet.status = "GENERAL_STATS_FOUND";
      packet.stats = generalStats;
      response.json(packet);
    } else {
      packet.status = "USER_NOT_FOUND";
      response.json(packet);
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
      packet.status = "SEASONAL_STATS_FOUND";
      packet.stats = seasonalStats;
      response.json(packet);
    } else {
      packet.status = "USER_NOT_FOUND";
      response.json(packet);
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
    let packet = {
      status: ""
    };
    const operatorStats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "operators");
    if (operatorStats) {
      packet.status = "OPERATOR_STATS_FOUND";
      packet.stats = operatorStats;
      response.json(packet);
    } else {
      packet.status = "USER_NOT_FOUND";
      response.json(packet);
    }
  });

  /*
    @route /api/statistics/team
    @method GET

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_GETTING_TEAM_STATS)

      If user has no team
        packet: Object (status: USER_HAS_NO_TEAM)

      If team is not found
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If user is not on team
        packet: Object (status: USER_NOT_QUALIFIED)

      If stats are found
        packet: Object (status: TEAM_STATS_FOUND)
  */
  app.get("/api/statistics/team", (request, response, done) => {
    log("GET REQUEST AT /api/statistics/team");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let packet = {
      status: ""
    }
    if (request.user.team_code) {
      Team.findOne({ join_code: request.user.team_code }).then(async (team) => {
        if (team) {
          if (team.members.indexOf(String(request.user._id)) >= 0 || team.editors.indexOf(String(request.user._id)) >= 0 || team.admins.indexOf(String(request.user._id)) >= 0) {
            let size = 0;
            let kd = 0;
            let wl = 0;
            let mmr = 0;
            let mmrchange = 0;
            let level = 0;
            let index = 0;
            let members = [];
            while (index < team.admins.length) {
              await new Promise(async (resolve, reject) => {
                User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).then(async (user) => {
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
                  packet.status = "ERROR_WHILE_GETTING_TEAM_STATS";
                  reject(false);
                })
              });
              size++;
              index++;
            }
            index = 0;
            while (index < team.editors.length) {
              await new Promise(async (resolve, reject) => {
                User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).then(async (user) => {
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
                  packet.status = "ERROR_WHILE_GETTING_TEAM_STATS";
                  reject(false);
                })
              });
              size++;
              index++;
            }
            index = 0;
            while (index < team.members.length) {
              await new Promise(async (resolve, reject) => {
                User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).then(async (user) => {
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
                  packet.status = "ERROR_WHILE_GETTING_TEAM_STATS";
                  reject(false);
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
            packet.team = members;
            packet.status = "TEAM_STATS_FOUND";
            packet.kd = kd;
            packet.wl = wl;
            packet.mmr = mmr;
            packet.mmrchange = mmrchange;
            packet.level = level;
            response.json(packet);
          } else {
            packet.status = "USER_NOT_QUALIFIED";
            response.json(packet);
          }
        } else {
          packet.status = "TEAM_DOES_NOT_EXIST";
          response.json(packet);
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR_WHILE_GETTING_TEAM_STATS";
        response.json(packet);
      });
    } else {
      packet.status = "USER_HAS_NO_TEAM";
      response.json(packet);
    }
  });
}
