const Order = require("../models/addToCartModel");
const Menu = require("../models/MenuModel");
const Reservation = require("../models/reservationModel");

const getDashboard = async (req, res) => {
try {

    const totalOrders = await Order.countDocuments();

    const totalMenuItems = await Menu.countDocuments();
    
    const totalReservations = await Reservation.countDocuments();

    const revenue = await Order.aggregate([{
        $group:{
            _id:null,
            revenue:{ $sum :"$grandTotal"}
        }
    }]) ;
    
    const totalRevenue = revenue.length > 0 ?revenue[0].revenue : 0; 

    // Last 7 Days Revenue
    const revenueChart = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m",
              date: "$createdAt"
            }
          },
          revenue: {
            $sum: "$grandTotal"
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    const orderStatusChart = await Order.aggregate([
  {
    $group: {
      _id: "$orderStatus",
      count: { $sum: 1 }
    }
  }
]);

    res.json({
        totalOrders,
        totalMenuItems,
        totalReservations,
        totalRevenue,
        revenueChart,
        orderStatusChart
    })
    
} catch (error) {
    res.json({
        message:error.message
    })
}

}

module.exports = {
  getDashboard,
};