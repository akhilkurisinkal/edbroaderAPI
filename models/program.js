const mongoose=require('mongoose');
const programSchema=mongoose.Schema({
    code:String,
    name:String,
    level:Number,
    field:String,
    career:String,
    syllubas:Array,
    length:Number,
    school:String
})
module.exports=mongoose.model('program',programSchema);