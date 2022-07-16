"use strict";
const express=require('express');
const student=require('../models/student');
const user=require('../models/user')
const nodemailer = require("nodemailer");
const { db } = require('../models/student');

const router=express.Router();
router.get('/',(req,res)=>{
    res.send("signup");
})

router.post('/',(req,res)=>{

  //generating unique user ID
    const studentCode="STD";
    let Idpresent=0;
    let studentId="";
   do{
      let studentNumber=Math.floor(Math.random()*1000000);
      studentId=studentCode+studentNumber;
      db.collection('students').find({id:studentId}).toArray((err, result) => {
        if (err) throw err
        Idpresent=result.length;
      });
    }while(Idpresent>0);
  //-----------------------------

   const studentData=new student({
    id:studentId,
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
   })

   const vcode=Math.floor(Math.random()*1000000);
   const userData=new user({
    id:req.body.email,
    password:req.body.password,
    type:"student",
    vcode:vcode,
    verified:false,
    onboarded:false
   })

   //generating verification code
 
   
   async function main() {
     let testAccount = await nodemailer.createTestAccount();
     let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false,
       auth: {
         user: 'yukthink@gmail.com', 
         pass: 'ipxmgzisapkkvlcl'
       },
     });
   
     let info = await transporter.sendMail({
      from: '"akhil@edbroader 👻" <yukthink@gmail.com>',
      to: req.body.email, 
      subject: "Hello from Edbroader",
      text: "This is email body text.",
      html: "<div><b>Hello User!</b><p>Your OTP is "+ vcode +" </p></div>" // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  main().catch(console.error);




   db.collection('users').find({id:req.body.email}).toArray((err, result) => {
    if (err) throw err
    console.log(vcode);
    console.log(result);

    if(result.length>0){
      res.status(400).send({message:"Email already registered"});
    }else{
      userData.save((err,data)=>{
        if(err){
          console.log("Failed to save user credentials",err);
        }else{
          console.log("User credentials saved successfully :",data);
        }
      });
      studentData.save((err,data)=>{
        if(err){
            res.status(400).send({status:"failed",message:"failed to save student data!"})
            console.log("Failed to save user data",err);
        }else{
            res.status(200).send({status:"success",message:"student data saved successfully :",data});
            console.log("Student data saved successfully :",data);
        }
      })
    }
  });  
})

router.get('/verify',(req,res)=>{
 res.send("verify");
})

router.post('/verify',(req,res)=>{
  console.log("We are at verify POST route");
  const vcode = req.body.vcode;
  const vcodeInt= parseInt(vcode);
  db.collection('users').find({id:req.body.id,vcode:vcodeInt}).toArray((err, result) => {
    if (err) throw err
    console.log(result);
    console.log(req.body.id,req.body.vcode);
    if(result.length>0){
      db.collection('users').updateOne({id:req.body.id},{$set:{verified:true}});
      res.status(200).send({status:"verified",message:"Email verified successfully."});
      console.log("CODE VERIFIED");
    }else{
      res.status(400).send({status:"invalid",message:"Invalid code."});
      console.log("INVALID CODE");
    }
  });
})

module.exports=router;