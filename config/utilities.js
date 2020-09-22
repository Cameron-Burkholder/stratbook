/* config/utilities.js */

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const randomize = require("randomatic");
const saltRounds = 10;
const axios = require("axios");
require("dotenv").config();

// Load Team model
require("../models/Team.js");
const Team = require("../models/Team.js");

const pathToKey = path.join(__dirname, "..", "./id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

/*
  @func: log
  @desc: log a message to console with timestamp
  @param msg: String
*/

/*
  @func: verifyPassword
  @desc: compare password with hash in database to ensure passwords match
  @param password: String
  @param hash: String
*/

/*
  @func: hashPassword
  @desc: hash a password to store in database
  @param password: String
*/

/*
  @func: issueJWT
  @desc: issue a json web token to a verified user
  @param user: Object
*/

/*
  @func: genVerificationLink
  @desc: generate a long random string for verified users' emails
*/
/*
  @func: genJoinCode
  @desc: generate a unique 8-digit numeric string
*/
/*
  @func: getStats
  @desc: get data about a player
*/
module.exports = {
  log: function(msg) {
    if (process.env.NODE_ENV !== "TESTING") {
      console.log(new Date() + " --- " + msg);
    }
  },
  verifyPassword: function(password, hash) {
    let isValidPassword = bcrypt.compareSync(password, hash);
    return isValidPassword;
  },
  hashPassword: function(password) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  },
  issueJWT: function(user) {
    const _id = user._id;
    const expiresIn = 1000 * 60 * 60 * 24 * 7;      // 7 days
    const payload = {
      sub: _id,
      iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    };
  },
  genVerificationLink: function() {
    return randomize("Aa0", 128);
  },
  genJoinCode: async function() {
    let newCode;
    let isUnique = false;
    do {
      newCode = randomize("0", 8);
      await Team.findOne({ join_code: newCode }, (error, team) => {
        if (error) {
          console.log(error);
        }

        if (!team) {
          isUnique = true;
        }
      });
    } while (!isUnique);
    return newCode;
  },
  getStats: async function(username, platform, type) {
    const data = await new Promise((resolve, reject) => {
      axios.get(`https://api2.r6stats.com/public-api/stats/${username}/${platform}/${type}`, {
        headers: {
          Authorization: process.env.STATS_API_KEY
        }
      }).then(response => {
        return resolve(response.data);
      }).catch(error => {
        return reject(null);
      });
    }).catch(error => {
      return null;
    });
    return data;
  }
};
