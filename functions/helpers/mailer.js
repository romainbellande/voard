const functions = require('firebase-functions');
const nodeMailer = require('nodemailer');
require('dotenv').config();

const getTransporter = () => nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      // should be replaced with real sender's account
      user: process.env.SMTP_USER || functions.config().smtp.user,
      pass: process.env.SMTP_PASSWORD || functions.config().smtp.password,
  }
});

const mailer = ({ to, subject, text }) => {
  const tranporter = getTransporter();

  return new Promise((resolve, reject) => {
    tranporter.sendMail({ to, subject, text }, (error, info) => {
      if (error) {
        return reject(error);
    }
      resolve(`Message ${info.messageId} sent: ${info.response}`);
    });
  });
}

module.exports = mailer;
