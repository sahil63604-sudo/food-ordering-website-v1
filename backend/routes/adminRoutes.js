const express=require("express");
const admin_Route=express.Router();
const {controlLogin}=require('../controller/adminloginController')

admin_Route.post('/login',controlLogin);

module.exports=admin_Route
