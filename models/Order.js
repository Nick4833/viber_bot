const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Orders", OrderSchema);
