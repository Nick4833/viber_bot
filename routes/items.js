const express = require("express");

const router = express.Router();
const Item = require("../models/Item");

//Get all the items from the database
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

//Add a new item
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
  });

  try {
    const savedItem = await item.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a specific Item
router.get("/:itemId", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    res.json(item);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete an item
router.delete("/:itemId", async (req, res) => {
  try {
    const removedItem = await Item.deleteOne({ _id: req.params.itemId });
    res.json(removedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

//update item
router.patch("/:itemId", async (req, res) => {
  try {
    const updateItem = await Item.updateOne(
      { _id: req.params.itemId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          stock: req.body.stock,
        },
      }
    );
    res.json(updateItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
