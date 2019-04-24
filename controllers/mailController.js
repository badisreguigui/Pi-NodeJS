"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (req,res) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

    
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'abdelkarim.turki@gmail.com', // generated ethereal user
      pass: 'Karim481516' // generated ethereal password
    }
  });
  //console.log(transporter);
  // setup email data with unicode symbols
  let mailOptions = {
    from: "abdelkarim.turki@gmail.com", // sender address
    to: "abdelkarim.turki@esprit.tn", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  };
  //console.log(mailOptions);

  // send mail with defined transport object
  transporter.sendMail(mailOptions,(error,info) => {
      if(error){
          console.log(error);
      }
      else{
          console.log(info);
      }
      console.log("Message sent: %s", info);
      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  })

  res.send("sent");

  
  
}


