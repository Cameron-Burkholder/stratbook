/* middleware/userHasTeam.js */

const mongoose = require("mongoose");

module.exports = middleware = {
  userHasTeam: async (request, response, done) => {
    if (request.user.team_code) {
      Team.findOne({ join_code: request.user.team_code }).then(team => {
        if (team) {
          request.team = team;
          done();
        } else {
          response.json({
            status: "TEAM_NOT_FOUND",
            message: "No team with the requested join code exists."
          });
          response.end();
        }
      }).catch(error => {
        console.log(error);
        response.json({
          status: "ERROR",
          message: "An error occurred while finding the team associated with the user's team code."
        });
        response.end();
      })
    } else {
      response.json({
        status: "USER_HAS_NO_TEAM",
        message: "The user does not have a team code associated with his/her account."
      });
      response.end();
    }
  }
}
