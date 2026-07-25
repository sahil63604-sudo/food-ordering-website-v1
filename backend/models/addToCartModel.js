const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },

    cartItems: [
      {
        _id: String,
        name: String,
        description: String,
        price: Number,
        quantity: Number,
        image: String,
        category: String,
      },
    ],
    PaymentDetails: [
      {
        name: String,
        phone: Number,
        email: String,
        address: String,
        city: String,
        pincode: Number,
        delivery: String,
        payment:String,
        notes: String,
      }
    ],

    grandTotal: {
      type: Number,
    },

    orderStatus: {
      type: String,
      default: "Order Placed",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("Order", OrderSchema);
