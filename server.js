/* server.js */

// IMPORT PACKAGES
const express = require("express");           // For use in routing and middleware
const mongoose = require("mongoose");         // For use in database connections
const bodyParser = require("body-parser");    // For use in parsing incoming requests
const passport = require("passport");         // For use in authentication
const path = require("path");                 // For use in directory management
const email = require("./config/email");      // For use in sending emails

require("dotenv").config();                   // For using environment variables

// IMPORT UTILITY FUNCTIONS
const { log } = require("./config/utilities");

// SETUP EXPRESS
const app = express();
app.use(express.static(path.join(__dirname, "client", "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SETUP DATABASE
const URI = (process.env.NODE_ENV === "TESTING" ? process.env.TESTING_URI : process.env.MONGODB_URI);
// Handle error in establishing connection
try {
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  log("CONNECTION TO DATABASE ESTABLISHED.");
} catch(error) {
  log("ERROR WHILE CONNECTING TO DATABASE: " + error);
}
// Handle error after connection has been established
mongoose.connection.on("error", (error) => {
  log("DATABASE ERROR: " + error);
});

// SETUP EMAIL
require("./config/email.js");

// IMPLEMENT PASSPORT
app.use(passport.initialize());
require("./config/auth.js")(passport, app);

// IMPLEMENT ROUTES
require("./routes/users.js")(app, passport);
require("./routes/teams.js")(app, passport);
app.get("/*", function(request, response) {
  log("GET REQUEST AT /*");
  response.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

// DEFINE PORT AND DEPLOY SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log("DEPLOY SERVER: Server running on port " + port);
});

module.exports = app;
