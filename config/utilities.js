const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const saltRounds = 32;

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

module.exports = {
  log: function(msg) {
    console.log(new Date() + " --- " + msg);
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
    const expiresIn = "7d";
    const payload = {
      sub: _id,
      iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });
  }
};
