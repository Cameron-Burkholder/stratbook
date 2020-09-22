/* routes/statistics.js */

const { log, getStats } = require("../config/utilities.js");

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
    log("GET REQUEST AT /api/statistics/seasonal");
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

}
