const nodemailer = require("nodemailer");

const GmailSMTP = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// 👇 EH ADD KAR
GmailSMTP.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Ready");
  }
});

module.exports = GmailSMTP;