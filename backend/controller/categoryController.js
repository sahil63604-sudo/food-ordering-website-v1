const category= require('../models/categoryModel');


const getCategory = async(req,res) =>{
 try {
    let count = await category.countDocuments()
    const data = await category.find()
    res.json({data,count})
 } catch (error) {
    res.json({message:error.message})
 }
}

const addCategory = async(req,res) =>{
 try {
    const data = await category.create(req.body)
    res.json(data)
 } catch (error) {
    res.json({message:error.message})
 }
}

const dltCategory = async(req,res) =>{
    try {
        const {id} = req.params;
        const data = await category.findByIdAndDelete(id);
        res.json(data)
    } catch (error) {
    res.json({message:error.message})
    }
}

module.exports={
    getCategory,
    addCategory,
    dltCategory
}