const mongoose=require('mongoose');
const backgroundSchema=mongoose.Schema({
    user:String,
    level:String,
    field:String,
    subField:String,
    career:String
})
module.exports=mongoose.model('background',backgroundSchema);