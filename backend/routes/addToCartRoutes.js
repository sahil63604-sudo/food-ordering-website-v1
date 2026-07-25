const express=require("express");
const ATC_Route=express.Router();

const {getATC,getCartItem,deleteCartItem,AdminCartdata,getAdminCartdata,updateCartQuantity,updateOrderStatus,showStatusOrders}=require('../controller/atcController')

ATC_Route.post('/get-order',getATC);
ATC_Route.get('/get-cartItem/:userId',getCartItem);
ATC_Route.delete('/delete-cartItem/:id',deleteCartItem);

ATC_Route.get('/getAdminCartData',getAdminCartdata); 
ATC_Route.post('/postAdminCartData',AdminCartdata);
ATC_Route.patch("/cart/:id", updateCartQuantity);

ATC_Route.get('/showStatusOrders/:userId',showStatusOrders)
ATC_Route.put('/order-status/:id',updateOrderStatus)

module.exports=ATC_Route
