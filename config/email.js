/* config/email.js */

// Load email utility
const nodemailer = require("nodemailer");
// Load google apis for email
const { google } = require("googleapis");
const googleapis = require("googleapis");
// Load logging function
const { log } = require("./utilities.js");

// Configure OAuth client
const OAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

/**
* Send an email to user
* @name email
* @function
* @param {string} email user's email
* @param {string} subject subject of email to send
* @param {string} message html string for email body
*/
module.exports = (userEmail, subject, message) => {
  if (process.env.NODE_ENV !== "development") {
    OAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });
    const accessToken = OAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken
        }
    });

    let emailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: subject,
      html: message
    };
    try {
      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return error;
        } else {
          transport.close();
          return null;
        }
      });
    } catch(error) {
      console.log(error);
      return error;
    }
  }
};
