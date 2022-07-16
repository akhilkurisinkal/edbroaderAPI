const mongoose=require('mongoose');
const usersSchema=mongoose.Schema({
    id:String,
    password:String,
    type:String,
    vcode:Number,
    verified:Boolean,
    onboarded:Boolean
})
module.exports=mongoose.model('users', usersSchema);