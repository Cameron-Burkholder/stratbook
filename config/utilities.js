/* config/utilities.js */

// Load password hashing libraries
const bcrypt = require("bcryptjs");
const saltRounds = 10;
// Load JWT library
const jsonwebtoken = require("jsonwebtoken");
// Load axios request library
const axios = require("axios");
// Load email function
const email = require("./email.js");
// Load random string generator
const randomize = require("randomatic");
// Load random word generator
const randomWords = require("random-words");
// Config .env variables
require("dotenv").config();
// Load push notifications
const webpush = require("web-push");
webpush.setGCMAPIKey(process.env.CLOUD_MESSAGING_API);
webpush.setVapidDetails(
  `mailto:${process.env.EMAIL}`,
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
)

// Load Team model
require("../models/Team.js");
const Team = require("../models/Team.js");

const PRIV_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, "\n");

/**
* Send an email and push notification to user
* @name notify
* @function
* @async
* @param {object} user user object from database
* @param {object} message a message object used to notify the user with a title and body
*/
exports.notify = async function(user, message) {
  if (process.env.NODE_ENV !== "development") {
    const email = require("./email.js");
    let email_body = message.email_body;
    if (user.subscription) {
      let body = message.body;
      for (let i = 2; i < arguments.length; i++) {
        let startIndex = body.indexOf("{");
        let endIndex = body.indexOf("}");
        body = body.slice(0, startIndex) + body.slice(endIndex + 1, body.length);
        body = body.replace(`#${i - 1}`, arguments[i]);
        startIndex = email_body.indexOf("{");
        endIndex = email_body.indexOf("}");
        email_body = email_body.slice(0, startIndex) + email_body.slice(endIndex + 1, email_body.length);
        email_body = email_body.replace(`#${i - 1}`, arguments[i]);
      }
      try {
        await webpush.sendNotification(JSON.parse(user.subscription), JSON.stringify({ title: message.status, body: body }));
      } catch(error) {
        console.log(error);
      } finally {
        email(user.email, message.status, email_body);
      }
    }
  }
}

/**
* Log a message to the console with the time and date
* @name log
* @function
* @param {string} msg message to log to screen
*/
exports.log = function(msg) {
  if (process.env.NODE_ENV !== "development") {
    console.log(new Date() + " --- " + msg);
  }
}

/**
* Verify correct password is provided
* @name verifyPassword
* @function
* @param {string} password password provided
* @param {string} hash hashed password to compare to
* @returns {bool} returns true if passwords match
*/
exports.verifyPassword = function(password, hash) {
  let isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
}

/**
* Hash password for storage in database
* @name hashPassword
* @function
* @param {string} password plain text password to hash
* @returns {string} hashed password
*/
exports.hashPassword = function(password) {
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
}

/**
* Issue JSON Web Token to user
* @name issueJWT
* @function
* @param {object} user user object from database
* @returns {object} jwt for use in authentication
*/
exports.issueJWT = function(user) {
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
}

/**
* Generate a 128 character string to use as a verification token
* @name genVerificationLink
* @function
* @returns {string} random 128 character string
*/
exports.genVerificationLink = function() {
  return randomize("Aa0", 128);
}

/**
* Generate unique 8 digit team code
* @name genJoinCode
* @function
* @async
* @returns {string} 8 digit string
*/
exports.genJoinCode = async function() {
  let newCode;
  let isUnique = false;
  do {
    newCode = randomize("0", 8);
    let team;
    try {
      team = await Team.findOne({ join_code: newCode }).exec();
    } catch(error) {
      console.log(error);
    }

    if (!team) {
      isUnique = true;
    }
  } while (!isUnique);
  return newCode;
}

/**
* Get stats from r6stats api for a specific user
* @name getStats
* @function
* @async
* @param {string} username siege username
* @param {string} platform siege platform
* @param {string} type type of statistics to retrieve
* @returns {object} statistics for provided user on provided platform of provided type
*/
exports.getStats = async function(username, platform, type) {
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

/**
* Generate random word-based key
* @name genWordCode
* @function
* @async
* @returns {string} word-based key string
*/
exports.genWordCode = function() {
  return randomWords({ exactly: 3, join: "-" });
}
