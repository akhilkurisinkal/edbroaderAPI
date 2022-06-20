const mongoose=require('mongoose');
const usersSchema=mongoose.Schema({
    id:String,
    password:String,
    type:String
})
module.exports=mongoose.model('users', usersSchema);