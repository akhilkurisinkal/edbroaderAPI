const express=require('express');
const { db } = require('../models/background');

const router=express.Router();
router.get('/:subField',(req,res)=>{
    let subField=req.params.subField;
    console.log(subField)
    db.collection('careers').find({subField:subField}).toArray((err, result) => {
      if(result.length<0){
      res.status(400).send({status:"notfound",message:"No careers found"});
      console.log("No careers found");
    }else{
      res.status(200).send({status:"found",message:"careers found",data:result});
      console.log("careers found");
      console.log(result);
    }
})
})

module.exports=router;