/* config/auth.js */

// Configure passport to use jwt
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
// Load mongoose
const mongoose = require("mongoose");
// Load User models
require("../models/User.js");
const User = mongoose.model("users");

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
