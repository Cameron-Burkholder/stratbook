/* routes/teams.js */

const email = require("../config/email.js");
const { log, genJoinCode, notify, getStats } = require("../config/utilities.js");
const mongoose = require("mongoose");
const messages = require("../client/src/messages/messages.js");
const emails = require("../client/src/messages/emails.js");
const errors = require("../client/src/messages/errors.js");

// Load validation
const validation = require("../validation.js");
// Load middleware
const middleware = require("../middleware.js");

// Prepare user verification
let host;

// Define roles
const ADMIN = "ADMIN";
const MEMBER = "MEMBER";
const EDITOR = "EDITOR";

const { CURRENT_SEASON } = require("../client/src/data.js");

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

// Load Strategies model
require("../models/Strategies.js");
const Strategies = require("../models/Strategies.js");

// Load Team model
require("../models/Team.js");
const Team = require("../models/Team.js");

module.exports = async (app, passport) => {

  /**
  * Fetch team data
  * @name /api/teams/view-team
  * @function
  * @async
  * @description The user submits a request to view the team data.
  *   If the user is not a member of the team, this returns a permission denied object.
  *   If the user is able to view the team, this returns a team found object.
  */
  app.get("/api/teams/view-team", (request, response, done) => {
    log("GET REQUEST AT /api/teams/view-team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {

    if (request.team.members.indexOf(String(request.user._id)) < 0 && request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let team_data = {
      name: request.team.name,
      join_code: request.team.join_code,
      platform: request.team.platform,
      members: [],
      editors: [],
      admins: [],
      mmr: request.team.mmr,
      open: request.team.open
    };

    let index = 0;
    while (index < request.team.members.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.members[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_VIEW_TEAM);
      }

      user.password = undefined;
      user._id = undefined;
      user.__v = undefined;
      team_data.members.push(user);
      index++;
    }

    index = 0;
    while (index < request.team.editors.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.editors[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_VIEW_TEAM);
      }

      user.password = undefined;
      user._id = undefined;
      user.__v = undefined;
      team_data.editors.push(user);
      index++;
    }

    index = 0;
    while (index < request.team.admins.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_VIEW_TEAM);
      }

      user.password = undefined;
      user._id = undefined;
      user.__v = undefined;
      team_data.admins.push(user);
      index++;
    }

    let packet = messages.TEAM_FOUND;
    packet.team_data = team_data;
    response.json(packet);
  });

  /**
  * Fetch blocked users
  * @name /api/teams/view-blocked-users
  * @function
  * @async
  * @description The user submits a request to view blocked users.
  *   If the user is not a member of the team, this returns a permission denied object.
  *   If the user can view the blocked users, this returns a blocked users found object.
  */
  app.get("/api/teams/view-blocked-users", (request, response, done) => {
    log("GET REQUEST AT /api/teams/view-blocked-users");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    if (request.team.members.indexOf(String(request.user._id)) < 0 && request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let blocked_users = [];
    let index = 0;
    while (index < request.team.blocked_users.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(request.team.blocked_users[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_VIEW_BLOCKED_USERS);
      }

      blocked_users.push({
        username: user.username,
        _id: String(user._id)
      });
      index++;
    }

    let packet = messages.BLOCKED_USERS_FOUND;
    packet.blocked_users = blocked_users;
    response.json(packet);
  });

  /**
  * Create a team
  * @name /api/teams/create-team
  * @function
  * @async
  * @description The user submits a request to create a team.
  *   If there is already a team with that name, this returns a team exists object.
  *   If the user can create a team, this returns a team created object.
  * @param {string} request.body.name the name of the team to be created
  */
  app.post("/api/teams/create-team", (request, response, done) => {
    log("POST REQUEST AT /api/teams/create-team");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamInput, middleware.userIsVerified, middleware.userHasNoTeam, async (request, response) => {

    let existing_team;
    let user;
    try {
      existing_team = await Team.findOne({ name: request.body.name }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_CREATE_TEAM);
    }

    if (existing_team) {
      return response.json(messages.TEAM_EXISTS);
    }

    const join_code = await genJoinCode();
    let admins = [];
    admins.push(String(request.user._id));

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_CREATE_TEAM);
    }

    const newStrategies = new Strategies({
      join_code: join_code
    });

    const newTeam = new Team({
      join_code: join_code,
      members: [],
      admins: admins,
      editors: [],
      blocked_users: [],
      name: request.body.name,
      strategies_id: newStrategies._id,
      platform: request.user.platform.toUpperCase(),
      open: true,
      mmr: 0
    });

    user.team_code = newTeam.join_code;
    user.status = ADMIN;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_CREATE_TEAM);
    }

    try {
      await newTeam.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_CREATE_TEAM);
    }

    try {
      await newStrategies.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_CREATE_TEAM);
    }

    let packet = emails.TEAM_CREATED;
    if (process.env.NODE_ENV === "development") {
      packet.team_code = newTeam.join_code;
    }
    response.json(packet);
    notify(user, emails.TEAM_CREATED, team.name);
  });

  /**
  * Make an announcement
  * @name /api/teams/announce
  * @function
  * @async
  * @description The user submits a request to make a team announcement.
  *   If the user is not an admin, this returns a permission denied object.
  *   If the data is invalid, this returns an invalid announcement object.
  *   If the user can make the announcement, this returns an announcement sent object.
  * @param {string} request.body.announcement the announcement to send
  */
  app.post("/api/teams/announce", (request, response, done) => {
    log("POST REQUEST AT /api/teams/announce");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateAnnouncement, middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, async (request, response) => {
    if (request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let team;
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ANNOUNCE);
    }

    let index = 0;
    while (index < team.members.length) {
      let member;
      try {
        member = await User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_ANNOUNCE);
      }

      notify(member, emails.ANNOUNCEMENT, request.user.username, request.body.announcement);
      index++;
    }

    index = 0;
    while (index < team.editors.length) {
      let editor;
      try {
        editor = await User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_ANNOUNCE);
      }

      notify(editor, emails.ANNOUNCEMENT, request.user.username, request.body.announcement);
      index++;
    }

    index = 0;
    while (index < team.admins.length) {
      let admin;
      try {
        admin = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_ANNOUNCE);
      }

      if (admin.username !== request.user.username) {
        notify(admin, emails.ANNOUNCEMENT, request.user.username, request.body.announcement);
      }
      index++;
    }

    response.json(messages.ANNOUNCEMENT_SENT);
  });

  /**
  * Update team name
  * @name /api/teams/update-name
  * @function
  * @async
  * @description The user submits a request to update the team name.
  *   If the requested name change is already taken, this returns a team exists object.
  *   If the user is not an admin on the team, this returns a permission denied object.
  *   If the user is able to update the team name, this returns a team name updated object.
  * @param {string} request.body.name team name to change to
  */
  app.patch("/api/teams/update-name", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/update-name");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamInput, middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, async (request, response) => {

    let team;
    let existing_team;
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_NAME)
    }

    if (request.user.status !== ADMIN || team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    try {
      existing_team = await Team.findOne({ name: request.body.name }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_NAME);
    }

    if (existing_team) {
      return response.json(messages.TEAM_EXISTS);
    }

    team.name = request.body.name;
    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_NAME);
    }

    response.json(messages.TEAM_NAME_UPDATED);

    let index = 0;
    while (index < team.admins.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return;
      }

      notify(user, emails.TEAM_NAME_UPDATED, team.name);
      index++;
    }
  });

  /**
  * Join team
  * @name /api/teams/join-team
  * @function
  * @async
  * @description The user submits a request to join a team.
  *   If no team with the provided join code exists, this returns a team not found object.
  *   If the user's platform does not match the team platform, this returns a platform does not match object.
  *   If the user is blocked from the team, this returns a permission denied object.
  *   If the team is closed, this returns a permission denied object.
  *   If the team has an mmr threshold and the user cannot be found, this returns a permission denied object.
  *   If the user's mmr is below the team's threshold, this returns a permission denied object
  *   If the user is able to join the team, this returns a team joined object.
  * @param {string} request.body.join_code the join code of the team to join
  */
  app.patch("/api/teams/join-team", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/join-team");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateJoinCode, middleware.userIsVerified, middleware.userHasNoTeam, async (request, response) => {
    let team;

    try {
      team = await Team.findOne({ join_code: request.body.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_JOIN_TEAM);
    }

    if (team) {
      if (team.platform === request.user.platform.toUpperCase()) {
        if (team.blocked_users.indexOf(String(request.user._id)) < 0) {

          if (!team.open) {
            return response.json(messages.PERMISSION_DENIED);
          }

          let stats;
          try {
            stats = await getStats(request.user.username.toLowerCase(), request.user.platform.toLowerCase(), "seasonal")
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_JOIN_TEAM);
          }

          if (team.mmr !== 0) {
            if (stats) {
              if (stats.seasons[CURRENT_SEASON].regions.ncsa[0].mmr < team.mmr) {
                return response.json(messages.PERMISSION_DENIED);
              }
            } else {
              return response.json(messages.PERMISSION_DENIED);
            }
          }

          let user;
          try {
            user = await User.findOne({ _id: request.user._id }).exec();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_JOIN_TEAM);
          }

          team.members.push(String(request.user._id));
          user.team_code = team.join_code;
          user.status = MEMBER;

          try {
            await user.save();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_JOIN_TEAM);
          }

          try {
            await team.save();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_JOIN_TEAM);
          }

          response.json(messages.TEAM_JOINED);

          let index = 0;
          while (index < team.admins.length) {
            let admin;
            try {
              admin = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
            } catch(error) {
              console.log(error);
              response.json(errors.ERROR_JOIN_TEAM);
            }

            notify(admin, emails.USER_JOINED_TEAM, user.username, team.name);
            index++;
          }

        } else {
          return response.json(messages.PERMISSION_DENIED);
        }
      } else {
        return response.json(messages.PLATFORM_DOES_NOT_MATCH);
      }
    } else {
      return response.json(messages.TEAM_NOT_FOUND);
    }
  });

  /**
  * Leave team
  * @name /api/teams/leave-team
  * @function
  * @async
  * @description The user submits a request to leave team.
  *   If the user is able to leave the team, this returns a team left object.
  */
  app.patch("/api/teams/leave-team", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/leave-team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    let user;
    let team;

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_LEAVE_TEAM);
    }

    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_LEAVE_TEAM);
    }

    user.status = undefined;
    user.team_code = undefined;

    if (team.members.indexOf(String(request.user._id)) >= 0) {
      let index = team.members.indexOf(String(request.user._id));
      team.members.splice(index, 1);
    } else if (team.editors.indexOf(String(request.user._id)) >= 0) {
      let index = team.editors.indexOf(String(request.user._id));
      team.editors.splice(index, 1);
    } else if (team.admins.indexOf(String(request.user._id)) >= 0) {
      let index = team.admins.indexOf(String(request.user._id));
      team.admins.splice(index, 1);
    }

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_LEAVE_TEAM);
    }

    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_LEAVE_TEAM);
    }

    if (team.admins.length === 0) {
      try {
        await Team.deleteOne({ join_code: request.user.team_code }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_LEAVE_TEAM);
      }

      try {
        await Strategies.deleteOne({ join_code: request.user.team_code }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_LEAVE_TEAM);
      }

      let index = 0;
      while (index < team.members.length) {
        let member;
        try {
          member = await User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_LEAVE_TEAM);
        }
        member.team_code = undefined;
        member.status = undefined;

        try {
          await member.save();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_LEAVE_TEAM);
        }

        notify(member, emails.TEAM_DISBANDED, team.name);
        index++;
      }

      index = 0;
      while (index < team.editors.length) {
        let editor;
        try {
          editor = await User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_LEAVE_TEAM);
        }
        editor.team_code = undefined;
        editor.status = undefined;

        try {
          await editor.save();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_LEAVE_TEAM);
        }

        notify(editor, emails.TEAM_DISBANDED, team.name);
        index++;
      }

      index = 0;
      while (index < team.admins.length) {
        let admin;
        try {
          admin = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_LEAVE_TEAM);
        }
        admin.team_code = undefined;
        admin.status = undefined;

        try {
          await admin.save();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_LEAVE_TEAM);
        }

        notify(admin, emails.TEAM_DISBANDED, team.name);
        index++;
      }

      response.json(messages.TEAM_LEFT);
    } else {
      response.json(messages.TEAM_LEFT);
      let index = 0;
      while (index < team.admins.length) {
        let admin;
        try {
          admin = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
        } catch(error) {
          console.log(error);
          response.json(errors.ERROR_LEAVE_TEAM);
        }

        notify(admin, emails.USER_LEFT_TEAM, user.username, team.name);
        index++;
      }
    }
  });

  /**
  * Block user
  * @name /api/teams/block-user
  * @function
  * @async
  * @description The user submits a request to block another user.
  *   If the user is not an admin on the team, this returns a permission denied object.
  *   If the requested user cannot be found, this returns a user not found object.
  *   If the user is able to be blocked, this returns a user blocked object.
  * @param {string} request.body.username the user to block
  */
  app.patch("/api/teams/block-user", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/block-user");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateBlockUser, middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    let team;
    let user;

    try {
      team = await Team.findOne({ join_code: request.team.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_BLOCK_USER);
    }

    if (team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    try {
      user = await User.findOne({ username: request.body.username }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_BLOCK_USER);
    }

    if (!user) {
      return response.json(messages.USER_NOT_FOUND);
    }

    team.blocked_users.push(String(user._id));
    if (team.members.indexOf(String(user._id)) >= 0) {
      let index = team.members.indexOf(String(user._id));
      team.members.splice(index, 1);
    }
    if (team.editors.indexOf(String(user._id)) >= 0) {
      let index = team.editors.indexOf(String(user._id));
      team.editors.splice(index, 1);
    }
    if (team.admins.indexOf(String(user._id)) >= 0) {
      let index = team.admins.indexOf(String(user._id));
      team.admins.splice(index, 1);
    }
    user.team_code = undefined;
    user.status = undefined;

    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_BLOCK_USER);
    }

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_BLOCK_USER);
    }

    response.json(messages.USER_BLOCKED);
  });

  /**
  * Unblock user
  * @name /api/teams/unblock-user
  * @function
  * @async
  * @description The user submits a request to unblock a user.
  *   If the requested user is not blocked, this returns a user not found object.
  *   If the user is able to be unblocked, this returns a user unblocked object.
  * @param {string} request.body.id id of user to unblock
  */
  app.patch("/api/teams/unblock-user", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/unblock-user");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    let team;
    try {
      team = await Team.findOne({ join_code: request.team.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UNBLOCK_USER);
    }

    if (team.blocked_users.indexOf(String(request.body._id)) < 0) {
      return response.json(messages.USER_NOT_FOUND);
    }

    team.blocked_users.splice(team.blocked_users.indexOf(request.body._id), 1);

    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UNBLOCK_USER);
    }

    response.json(messages.USER_UNBLOCKED);
  });

  /**
  * Update team status
  * @name /api/teams/update-team-status
  * @function
  * @async
  * @description The user submits a request to update team status.
  *   If the user is not an admin on the team, this returns a permission denied object.
  *   If the status changed to is not valid, this returns an invalid team status object.
  *   If the user can successfully change the team status, this returns a team status updated object.
  * @param {Boolean} request.body.status the team status to change to
  */
  app.patch("/api/teams/update-team-status", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/update-team-status");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamStatus, middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    if (request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let team;
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_STATUS);
    }

    team.open = request.body.status;

    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_STATUS);
    }

    let index = 0;
    while (index < team.admins.length) {
      let admin;
      try {
        admin = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_STATUS);
      }
      notify(admin, emails.TEAM_STATUS_UPDATED, (team.open ? "OPEN" : "CLOSED"));
      index++;
    }

    let packet = emails.TEAM_STATUS_UPDATED;
    packet.open = team.open;
    response.json(packet);

  });

  /**
  * Update team platform
  * @name /api/teams/update-team-platform
  * @function
  * @async
  * @description The user submits a request to update the team platform
  *   If the user does not have permission, this returns a permission denied object
  *   If the team platform is able to be updated, this returns a platform updated object
  * @param {String} request.body.platform the platform to change to
  */
  app.patch("/api/teams/update-team-platform", (request, response, done) => {
    log("PATCH request at /api/teams/update-team-platform");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamPlatform, middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    if (request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let team;
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
    }

    team.platform = request.body.platform;
    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
    }

    let index = 0;
    while (index < team.members.length) {
      let member;
      try {
        member = await User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
      }

      member.platform = request.body.platform;

      try {
        await member.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
      }

      notify(member, emails.PLATFORM_UPDATED);
      index++;
    }

    index = 0;
    while (index < team.editors.length) {
      let editor;
      try {
        editor = await User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
      }

      editor.platform = request.body.platform;

      try {
        await editor.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
      }

      notify(editor, emails.PLATFORM_UPDATED);
      index++;
    }

    index = 0;
    while (index < team.admins.length) {
      let admin;
      try {
        admin = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
      }

      admin.platform = request.body.platform;

      try {
        await admin.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_UPDATE_TEAM_PLATFORM);
      }

      notify(admin, emails.PLATFORM_UPDATED);
      index++;
    }

    response.json(messages.TEAM_PLATFORM_UPDATED);
  });

  /**
  * Update team mmr
  * @name /api/teams/update-team-mmr
  * @function
  * @async
  * @description The user submits a request to update the team mmr
  *   If the user does not have permission, this returns a permission denied object
  *   If the team platform is invalid, this returns an invalid mmr object
  *   If the team mmr threshold is able to be updated, this returns a team mmr updated object
  * @param {Number} request.body.mmr the mmr threshold to use
  */
  app.patch("/api/teams/update-team-mmr", (request, response, done) => {
    log("PATCH request at /api/teams/update-team-platform");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamMMR, middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    if (request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let team;
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_MMR);
    }

    team.mmr = request.body.mmr;

    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_TEAM_MMR);
    }

    response.json(messages.TEAM_MMR_UPDATED);
  })

  /**
  * Delete team
  * @name /api/teams/delete-team
  * @function
  * @async
  * @description The user submits a request to delete the team.
  *   If the the user is not an admin on the team, this returns a permission denied object.
  *   If the team is able to be deleted, this returns a team deleted object.
  */
  app.delete("/api/teams/delete-team", (request, response, done) => {
    log("DELETE REQUEST AT /api/teams/delete-team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, async (request, response) => {
    let team;
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DELETE_TEAM);
    }

    if (team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    try {
      await Team.deleteOne({ join_code: team.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DELETE_TEAM);
    }

    try {
      await Strategies.deleteOne({ join_code: team.join_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DELETE_TEAM);
    }

    let index = 0;
    while (index < team.members.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_TEAM);
      }

      user.team_code = undefined;
      user.status = undefined;

      notify(user, emails.TEAM_DISBANDED, team.name);

      try {
        await user.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_TEAM);
      }

      index++;
    }

    index = 0;
    while (index < team.editors.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_TEAM);
      }

      user.team_code = undefined;
      user.status = undefined;

      notify(user, emails.TEAM_DISBANDED, team.name);

      try {
        await user.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_TEAM);
      }

      index++;
    }

    index = 0;
    while (index < team.admins.length) {
      let user;
      try {
        user = await User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_TEAM);
      }

      user.team_code = undefined;
      user.status = undefined;

      notify(user, emails.TEAM_DISBANDED, team.name);

      try {
        await user.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_TEAM);
      }

      index++;
    }

    response.json(messages.TEAM_DELETED);
  });
};
