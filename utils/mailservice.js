const nodemailer = require("nodemailer");

const smtpMailId = "bsstriton@gmail.com";
const smtpMailPass = "txca nzoa htuz ujal";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: smtpMailId,
    pass: smtpMailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMailNotification = async (toAddress, subject, text, template) => {
  transporter.sendMail(
    {
      from: smtpMailId,
      to: `${toAddress}`,
      subject: `${subject}`,
      text: text,
      html: template,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response, "mail sent");
      }
    }
  );
};

module.exports = { sendMailNotification };
