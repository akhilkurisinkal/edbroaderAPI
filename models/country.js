const mongoose=require('mongoose');
const countrySchema=mongoose.Schema({
    code:String,
    name:String,
    fields:Array
})
module.exports=mongoose.model('country',countrySchema);