import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: process.env.HOST,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  secure: true,
});
router.post("/registerGame", function (req, res) {
  console.log("mail request");
  console.log(req.body, "req.bdy");
  const { to, subject, text } = req.body;
  const mailData = {
    from: "badstophelp@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: `<div><h3>Successfully Posted Game, ${text}!</h3><br/><div>Please refer to http://localhost:3000/mygames/${text} to check for updates on your game!</div><br/><div>Regards,<br/>SG Badminton Stop</div></div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
    }
    res.status(200).send({ message: "Email sent!" });
  });
});
router.post("/registerUser", function (req, res) {
  const { to, subject, text } = req.body;
  const mailData = {
    from: "badstophelp@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: `<div><h3>Successfully Registered Game, ${text}!</h3><br/><div>Your contact information has been passed to organsier to contact you!</div><br/><div>Regards,<br/>SG Badminton Stop</div></div>`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
    }
    res.status(200).send({ message: "Email sent!" });
  });
});

export default router;
