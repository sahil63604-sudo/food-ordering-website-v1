const mongoose =require("mongoose")

const CatergorySchema = new mongoose.Schema({
    name:{
        type:String
    }
});

module.exports=mongoose.model('CatergorySchema',CatergorySchema);