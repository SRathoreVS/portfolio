const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/send-email", (req, res) => {
  const { fname, lname, email, comment } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password
    },
  });

  // Mail options
  let mailOptions = {
    from: "your-email@gmail.com", // Replace with your email
    to: "satyamchelsea123@gmail.com", // The recipient's email
    subject: "New Contact Form Submission",
    text: `You have a new contact form submission:
      First Name: ${fname}
      Last Name: ${lname}
      Email: ${email}
      Comment: ${comment}`,
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    res.send("Email has been sent");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
