/* config/auth.js */

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
require("../models/User.js");
const User = mongoose.model("users");
const path = require("path");
const fs = require("fs");
const opts = {};

const PUB_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, "\n");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"]
};

/*
  @func: passport.authenticate
  @desc: Authenticate request based on json web token

  @outputs:
    If there is an error finding the user
      done: function (error: error, data: false)

    If the user is not found in the database
      done: function (error: null, data: false)
    Else
      done: function (error: null, data: user)
*/
module.exports = (passport, app) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.sub }, (error, user) => {
      if (error) {
        console.log(error);
        return done(error, false);
      }
      if (!user) {
        return done(null, false);
      } else {
        // User authorized
        return done(null, user);
      }
    });
  }));
};
