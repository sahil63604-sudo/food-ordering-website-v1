const mongoose  = require('mongoose')

const foodMenuSchema=mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String
    },
     image:{
        type:String,
        required:true
    },
    quantity:{
type:Number
    },
    isAvailable:{
        type:Boolean
    }
});

module.exports=mongoose.model('foodMenuSchema',foodMenuSchema)
