const mongoose=require("mongoose");

const adminDBSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    password:{
         type:String,
        required:true,
    }
})

module.exports=mongoose.model('adminDBSchema',adminDBSchema)