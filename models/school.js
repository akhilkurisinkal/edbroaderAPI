const mongoose=require('mongoose');
const schoolSchema=mongoose.Schema({
    code:String,
    name:String,
    country:String,
    Province:String,
    City:String,
    postalCode:String,
    email:String,
    phone:Number,
    website:String,
    wRank:Number,
    cRank:Number,
    fields:Array
})
module.exports=mongoose.model('school',schoolSchema);