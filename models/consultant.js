const mongoose=require('mongoose');
const consultantSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    certificate:String,
    password:String,
    Country:String,
    province:String,
    City:String,
    postalCode:String
})
module.exports=mongoose.model('consultant',consultantSchema);