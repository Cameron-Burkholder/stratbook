/* routes/statistics.js */

const { log, getStats } = require("../config/utilities.js");
const mongoose = require("mongoose");

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

const middleware = require("../middleware.js");

module.exports = async (app, passport) => {

  // Register for push notifications
  app.post("/api/push/register", (request, response, done) => {
    log("POST REQUEST AT /api/push/register");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response) => {
    let packet = {};
    const subscription = request.body.subscription;
    console.log("here");
    User.findOne({ _id: request.user._id }).then((user) => {
      user.subscription = subscription;
      user.save().then(() => {
        packet.status = "SUCCESS";
        packet.message = "You have successfully registered for push notifications.";
        response.json(packet);
        console.log("success");
      }).catch((error) => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to register for push notifications.";
        response.json(packet);
      })
    }).catch((error) => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to register for push notifications.";
      response.json(packet);
    });
  });

  app.delete("/api/push/unregister", (request, response, done) => {
    log("DELETE REQUEST AT /api/push/unregister");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response) => {
    let packet = {};
    User.findOne({ _id: request.user._id }).then((user) => {
      user.subscription = undefined;
      user.save().then(() => {
        packet.status = "SUCCESS";
        packet.message = "You have successfully unsubscribed from push notifications.";
        response.json(packet);
      }).catch((error) => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to unregister from push notifications.";
        response.json(packet);
      })
    }).catch((error) => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "A error occurred while attmepting to unregister from push notifications.";
      response.json(packet);
    });
  });
}
