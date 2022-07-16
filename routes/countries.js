const express=require('express');
const { db } = require('../models/background');

const router=express.Router();

router.get('/',(req,res)=>{
    db.collection('countries').find({}).toArray((err, result) => {
      if(result.length<0){
      res.status(400).send({status:"notfound",message:"No countries found"});
      console.log("No countries found");
    }else{
      res.status(200).send({status:"found",message:"countries found",data:result});
      console.log("countries found");
      console.log(result);
    }
})
})



router.get('/suggested/:subField',(req,res)=>{
    let subField=req.params.subField;
    console.log(subField)
    db.collection('countries').find({fields:subField}).toArray((err, result) => {
      if(result.length<0){
      res.status(400).send({status:"notfound",message:"No sub fields found"});
      console.log("No sub fields found");
    }else{
      res.status(200).send({status:"found",message:"sub fields found",data:result});
      console.log("sub fields found");
      console.log(result);
    }
})
})

module.exports=router;