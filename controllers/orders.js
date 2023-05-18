const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("orders").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error || "Some error occurred");
  }
};

const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must be a valid contact id");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("orders")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error || "Some error occurred");
  }
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
      .json(
        response.error || "Some error occurred while creating the order."
      );
  }
};

const updateOrder = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const order = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    manufacturer: req.body.manufacturer,
    inStock: req.body.inStock,
    brand: req.body.brand,
    color: req.body.color,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("orders")
    .replaceOne({ _id: userId }, order);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the order."
      );
  }
};

const deleteOrder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid contact id");
  }
  const orderId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("orders")
    .deleteOne({ _id: orderId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the order."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createOrder,
  updateOrder,
  deleteOrder,
};
