// const nodemailer = require("nodemailer");

// const TRANSPORTER = () => {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       password: process.env.EMAIL_PASSWORD,
//     },
//   });
//   return transporter;
// };

// module.exports = {
//   TRANSPORTER,
// };

const nodemailer = require("nodemailer");

// Create transporter with Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
       user: process.env.EMAIL,
      password: process.env.EMAIL_PASSWORD, 
  },
});

// Define email options
const sendEmail = ({ to, subject, text }) => {
  console.log(to, subject, text, "sendEmail");
  // Send email
  transporter.sendMail(
    {
      from: "sandip.axios@gmail.com",
      to: to,
      subject: subject,
      text: text,
    },
    (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};

module.exports = {
  sendEmail,
};
