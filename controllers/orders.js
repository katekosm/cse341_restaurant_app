const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection("orders")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid contact id");
  }
  const orderId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection("orders")
    .find({ _id: orderId })
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
};

const createOrder = async (req, res, next) => {
  const order = {
    customerId: req.body.customerId,
    orderDate: req.body.orderDate,
    totalPrice: req.body.totalPrice,
    paymentMethod: req.body.paymentMethod,
    paymentStatus: req.body.paymentStatus,
    shippingAddress: req.body.shippingAddress,
    shippingStatus: req.body.shippingStatus,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("orders")
    .insertOne(order);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the order.");
  }
};

const updateOrder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid destroyOrder id');
  }
  const orderId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const order = {
    customerId: req.body.customerId,
    orderDate: req.body.orderDate,
    totalPrice: req.body.totalPrice,
    paymentMethod: req.body.paymentMethod,
    paymentStatus: req.body.paymentStatus,
    shippingAddress: req.body.shippingAddress,
    shippingStatus: req.body.shippingStatus,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("orders")
    .replaceOne({ _id: orderId }, order);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the order.");
  }
};

const deleteOrder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must be a valid order id to delete it');
  }
  const orderId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("orders")
    .deleteOne({ _id: orderId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the order.");
  }
};

module.exports = { getAll, getSingle, createOrder, updateOrder, deleteOrder };
