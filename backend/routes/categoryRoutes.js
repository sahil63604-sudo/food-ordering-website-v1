const express = require("express");
const category_route = express.Router();

const {getCategory,addCategory,dltCategory}=require('../controller/categoryController');

category_route.get('/get-category',getCategory);
category_route.post('/add-category',addCategory);
category_route.delete('/remove-category/:id',dltCategory)

module.exports=category_route