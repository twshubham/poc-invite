const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config()
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const app = express();
const port = 5000;

const viewPath =  path.resolve(__dirname, 'templates/temp1/views/');
// const partialsPath = path.resolve(__dirname, './templates/partials');
app.use('/media', express.static('assets/images'));


const sendMail=()=>{
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      transporter.use('compile', hbs({
        viewEngine: {
          //extension name
          extName: '.handlebars',
          // layout path declare
          layoutsDir: viewPath,
          defaultLayout: false,
          //partials directory path
        //   partialsDir: partialsPath,
          express
        },
        //View path declare
        viewPath: viewPath,
        extName: '.handlebars',
    }));

      var mailOptions = {
        from: 'ERP Portal',
        to: 'shubhamk@thoughtwin.com',
        subject: 'Happ Birthday',
        template: 'index',
    //     attachments: [
    //       { filename: 'temp_bg1.jpg', path: path.resolve(__dirname, 'assets/images/temp_bg1.jpg')}
    //    ]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
sendMail()
app.listen(port , () => {
  console.log(`server up to ${port}`)
});