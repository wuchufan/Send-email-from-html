
require('dotenv').config();
let express = require("express"),
  path = require('path'),
  nodeMailer = require('nodemailer'),
  bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          // should be replaced with real sender's account
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS
      }

  });
  let mailOptions = {
      // should be replaced with real recipient's account
      to: process.env.AUTH_USER,
      subject: req.body.subject,
      // text: req.body.message,
      
      // attachments:[{filename:'Logo.jpg',
      //   path:'./src/Logo.jpg'
      // }]
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.writeHead(301, { Location: 'index.html' });
  res.end();
});

let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
