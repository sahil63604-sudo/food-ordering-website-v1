const express=require('express')

const route=express.Router();

const {getMenu,addItem,editItem,dltItem}=require('../controller/menuController')

route.get('/menu',getMenu);

// for admin //

route.post('/addMenu',addItem);
route.put('/updateMenu/:id',editItem);
route.delete('/removerMenu/:id',dltItem);

module.exports=route