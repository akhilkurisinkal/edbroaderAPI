const express=require('express');
const { db } = require('../models/student');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("login");
})

router.post('/',(req,res)=>{
    console.log(req.body);
    db.collection('users').find({id:req.body.id,password:req.body.password}).toArray((err, result) => {
        if (err) throw err

        console.log(result);
        if(result.length>0){
                res.sendStatus(200);
        }
      });

})


module.exports=router;