const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const path = require("path");
const fs = require("fs");
const opts = {};

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"]
};

module.exports = (passport, app) => {
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.sub}, function(err, user) {
      if (err) {
        return done(err, false);
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
