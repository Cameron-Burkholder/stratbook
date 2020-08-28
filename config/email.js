const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// EMAIL
// USE: send an email to users
// PARAMS: userEmail (string), subject (string), (message)
// RETURN: n/a
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
