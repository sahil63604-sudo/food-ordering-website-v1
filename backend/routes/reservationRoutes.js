const express=require("express");
const Reservation_Route=express.Router();

const {getReservation,addReservation,updateReservation}=require("../controller/reservationController")

Reservation_Route.get('/get-Reservation',getReservation);
Reservation_Route.post('/add-Reservation',addReservation);
Reservation_Route.put('/Reservation/:id',updateReservation);

module.exports=Reservation_Route