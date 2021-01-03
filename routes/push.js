/* routes/statistics.js */

const { log, getStats } = require("../config/utilities.js");
const mongoose = require("mongoose");
const messages = require("../client/src/messages/messages.js");
const errors = require("../client/src/messages/errors.js");

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

const middleware = require("../middleware.js");

module.exports = async (app, passport) => {

  /**
  * Subscribe to push notifications
  * @name /api/push/subscribe
  * @function
  * @async
  * @description The user submits a request to submit to push notifications.
  *   If the user is able to submit the request, this returns a push subscribed object.
  * @param {object} request.body.subscription the subscription to store
  */
  app.post("/api/push/subscribe", (request, response, done) => {
    log("POST REQUEST AT /api/push/subscribe");
    console.log("here");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let user;
    console.log("inside");
    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_PUSH);
    }

    user.subscription = request.body.subscription;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_PUSH);
    }

    response.json(messages.PUSH_SUBSCRIBE);
  });

}
