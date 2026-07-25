const Reservation=require("../models/reservationModel");
 const sendMail =require("./mailSMTPController")


// get Reservation data

async function getReservation(req,res) {
    let {page} = req.query;
    let limit = 12
    const data = await Reservation.find().skip((page-1)*limit).limit(limit);
    let count =await Reservation.countDocuments()
    res.json({
      data,
      count,
      totalPages: Math.ceil(count/limit)
    });
};

// post Reservation data

async function addReservation(req,res) {
    try {
        const data = await Reservation.create(req.body);
    res.json(data)
    } catch (error) {
        res.json({message:error.message})
    }
};



async function updateReservation(req, res) {
  try {
    let {id} = req.params;
    let {state} = req.body;
    
    const reservation = await Reservation.findByIdAndUpdate(
        id,
        {state},
        {new:true}
    );
   console.log("Before sendMail");
console.log(reservation);
console.log("EMAIL:", reservation.email);
console.log("STATE:", reservation.state);
    await sendMail(
      reservation.email,
      reservation.fullName,
      reservation.state,
      reservation.date,
      reservation.time
    );

    res.json({
  message: "Reservation Updated",
  reservation
});
  } catch (error) {
    res.json({message:error.message})
  }
};

module.exports={getReservation,addReservation,updateReservation}