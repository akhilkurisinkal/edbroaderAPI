const express=require('express');
const { db } = require('../models/background');

const router=express.Router();

router.get('/:country',(req,res)=>{
    let country=req.params.country;
    db.collection('schools').find({country:country}).toArray((err, result) => {
      if(result.length<0){
      res.status(400).send({status:"notfound",message:"No schools found"});
      console.log("No schools found");
    }else{
      res.status(200).send({status:"found",message:"schools found",data:result});
      console.log("schools found");
      console.log(result);
    }
})
})




router.get('/suggested/:country/:subField',(req,res)=>{
    let country=req.params.country;
    let subField=req.params.subField;
    db.collection('schools').find({country:country,fields:subField}).toArray((err, result) => {
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