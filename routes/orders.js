const express = require("express");

const router = express.Router();
const Order = require("../models/Order");

//Get all the orders from the database
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

//Add a new order
router.post("/", async (req, res) => {
  const order = new Order({
    item_name: req.body.item_name,
    price: req.body.price,
    phone: req.body.phone,
    payment: req.body.payment,
  });

  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a specific Order
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete an order
router.delete("/:orderId", async (req, res) => {
  try {
    const removedOrder = await Order.deleteOne({ _id: req.params.orderId });
    res.json(removedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//update order
router.patch("/:orderId", async (req, res) => {
  try {
    const updateOrder = await Order.updateOne(
      { _id: req.params.orderId },
      {
        $set: {
          orderStatus: req.body.orderStatus,
        },
      }
    );
    res.json(updateOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
