const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  item: {
    _id: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image: String,
    category: String,
  },
});

module.exports = mongoose.model("Cart", CartSchema);