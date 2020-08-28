/* config/email.js */

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

/*
  @func: email
  @desc: Send an email to a user
  @param userEmail: String
  @param subject: String
  @param message: String

  @outputs:
    If an error occurs
      error: Error

*/
module.exports = (userEmail, subject, message) => {
  let emailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject,
    text: message
  };
  transporter.sendMail(emailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};
