const express=require('express');
const { db } = require('../models/background');

const router=express.Router();

router.get('/:school/:level/:career',(req,res)=>{
    let school=req.params.school;
    let level=req.params.level;
    if(level==="Under Graduation"){
        level="Post Graduation";
    }
    let career=req.params.career;
    db.collection('programs').find({college:school,level:level,careers:career}).toArray((err, result) => {
      if(result.length<0){
      res.status(400).send({status:"notfound",message:"No programs found"});
      console.log("No programs found");
    }else{
      res.status(200).send({status:"found",message:"programs found",data:result});
      console.log("programs found");
      console.log(result);
    }
})
})


router.get('suggested/:school/:level/:career',(req,res)=>{
    let school=req.params.school;
    let level=req.params.level;
    if(level==="Under Graduation"){
        level="Post Graduation";
    }
    let career=req.params.career;
    db.collection('programs').find({college:school,level:level,careers:career,successRate:{$gt:70}}).toArray((err, result) => {
      if(result.length<0){
      res.status(400).send({status:"notfound",message:"No programs found"});
      console.log("No programs found");
    }else{
      res.status(200).send({status:"found",message:"programs found",data:result});
      console.log("programs found");
      console.log(result);
    }
})
})

module.exports=router;