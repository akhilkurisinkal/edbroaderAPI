const express=require('express');
const background=require('../models/background');
const { db } = require('../models/background');

const router=express.Router();
router.get('/',(req,res)=>{
    res.send("background");
})

router.post('/',(req,res)=>{

   const backgroundData=new background({
    user:req.body.user,
    level:req.body.level,
    field:req.body.field,
    career:req.body.career
   })
  
    backgroundData.save((err,data)=>{
      if(err){
          res.status(400).send({status:"failed",message:"failed to save background data!"})
          console.log("Failed to save background data",err);
      }else{
          res.status(200).send({status:"success",message:"background data saved successfully :",data});
          console.log("Background data saved successfully :",data);
      }
     })
})

module.exports=router;