const express = require("express");
const nodemailer = require("nodemailer");
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const port  = process.env.PORT;

app.listen(port, () => {
    console.log(`Nodemailer is listening at http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.end('{"success" : "Hello World", "status" : 200}');
});
app.post('/send-email', function (req, res) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    // console.log(req.body);
    let mailOptions = {
        from:process.env.FROM_EMAIL,
        to: req.body.to, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: req.body.html // html body
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
        
    });

    res.end('{"success" : "Email sent successfully", "status" : 200}');

});
