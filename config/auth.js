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

/**
* Define authentication strategy using JWT
* @function
* @async
* @param {object} passport passport object
* @param {object} app instantiated app object (express router)
* @returns {callback} callback called depending on validity of jwt
*/
module.exports = async (passport, app) => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    let user;
    try {
      user = await User.findOne({ _id: jwt_payload.sub }).exec();
    } catch(error) {
      console.log(error);
      return done(error, false);
    }

    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  }));
};
