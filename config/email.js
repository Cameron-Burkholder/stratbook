/* config/email.js */

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const googleapis = require("googleapis");
const { log } = require("./utilities.js");

const OAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

/*
  @func: email
  @desc: Send an email to a user
  @param userEmail: String
  @param subject: String
  @param html: HTML content to render

  @outputs:
    If an error occurs
      error: Error

*/
module.exports = email = (userEmail, subject, message) => {
  if (process.env.NODE_ENV !== "TESTING") {
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
    log("SENDING EMAIL.");
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
