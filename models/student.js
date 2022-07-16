const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    id:String,
    name:String,
    email:String,
    password:String
})
module.exports=mongoose.model('student',studentSchema);