const express=require('express');
const { db } = require('../models/student');
const router=express.Router();
const nodemailer = require("nodemailer");
router.get('/',(req,res)=>{
    res.send("login");
})

router.post('/',(req,res)=>{
    console.log(req.body);
    db.collection('users').find({id:req.body.id,password:req.body.password}).toArray((err, result) => {
        if (err) throw err

        console.log(result);
        if(result.length>0){ 
            console.log(result);
            if(result[0].verified!==true){
                db.collection('users').updateOne({id:req.body.id},{$set:{vcode:121213}});
                res.status(200).send({status:"unverified"})
            }else{
                if(result[0].onboarded!==true){
                    res.status(200).send({status:"verified",onboarded:"no"})
                }
                else{
                    res.status(200).send({status:"verified",onboarded:"yes"})
                }
            }
        }
        else{
            res.status(200).send({status:"invalid"}) 
        }
    });

})


module.exports=router;