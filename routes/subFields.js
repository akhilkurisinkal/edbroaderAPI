const express=require('express');
const { db } = require('../models/background');

const router=express.Router();
router.get('/:field',(req,res)=>{
    let field=req.params.field;
    console.log(field)
    db.collection('subFields').find({field:field}).toArray((err, result) => {
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