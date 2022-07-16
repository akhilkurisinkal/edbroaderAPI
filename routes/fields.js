const express=require('express');
const { db } = require('../models/background');

const router=express.Router();
router.get('/',(req,res)=>{
    db.collection('fields').find({}).toArray((err, result) => {
    if(result.length<0){
      res.status(400).send({status:"notfound",message:"No fields found"});
      console.log("No fields found");
    }else{
      res.status(200).send({status:"found",message:"fields found",data:result[0].data});
      console.log("fields found");
      console.log(result[0].data);
    }
})
})

module.exports=router;