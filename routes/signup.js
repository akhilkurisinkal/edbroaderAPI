"use strict";
const express=require('express');
const student=require('../models/student');
const user=require('../models/user')
const nodemailer = require("nodemailer");


const router=express.Router();
router.get('/',(req,res)=>{
    res.send("signup");
})

router.post('/signup',(req,res)=>{
   const studentData=new student({
    fullName:req.body.fullName,
    email:req.body.email,
    phone:req.body.phone,
    dob:req.body.dob,
    password:req.body.password,
    verified:false
   })


   const userData=new user({
    id:req.body.email,
    password:req.body.password,
    type:"student"
   })

   console.log(studentData);
   let randNum=Math.floor(Math.random()*1000000);
   const OTP=randNum;
   
   
   // async..await is not allowed in global scope, must use a wrapper
   async function main() {
     // Generate test SMTP service account from ethereal.email
     // Only needed if you don't have a real mail account for testing
     let testAccount = await nodemailer.createTestAccount();
   
     // create reusable transporter object using the default SMTP transport
     let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
         user: 'yukthink@gmail.com', // generated ethereal user
         pass: 'wwnsxsqhcapvmrye', // generated ethereal password
       },
     });
   
     // send mail with defined transport object
     let info = await transporter.sendMail({
       from: '"akhil@edbroader 👻" <yukthink@gmail.com>', // sender address
       to: "akhilkthomas99@gmail.com", // list of receivers
       subject: "Hello from Edbroader", // Subject line
       text: "This is email body text.", // plain text body
       html: "<div><b>Hello User!</b><p>Your OTP is "+ OTP +" </p></div>", // html body
     });
   
     console.log("Message sent: %s", info.messageId);
     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
   
     // Preview only available when sending through an Ethereal account
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
   }

   main().catch(console.error);
   console.log(studentData);
   studentData.save((err,data)=>{
    if(err){
        console.log(err);
    }else{
        res.status(200).send(data);
    }
   })
   userData.save();

})



module.exports=router;