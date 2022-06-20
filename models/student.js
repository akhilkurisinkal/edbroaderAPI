const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    fullName:String,
    email:String,
    phone:Number,
    dob:String,
    password:String,
    verified:Boolean
})
module.exports=mongoose.model('student',studentSchema);