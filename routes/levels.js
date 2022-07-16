const express=require('express');
const { db } = require('../models/background');

const router=express.Router();
router.get('/',(req,res)=>{
    db.collection('levels').find({}).toArray((err, result) => {
    if(result.length<0){
      res.status(400).send({status:"notfound",message:"No levels found"});
      console.log("No levels found");
    }else{
      res.status(200).send({status:"found",message:"Levels found",data:result[0].data});
      console.log("Levels found");
      console.log(result[0].data);
    }
})
})

module.exports=router;