const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("customers").find();
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
      .collection("customers")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error || "Some error occurred");
  }
};

const createCustomer = async (req, res, next) => {
  const customer = {
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
    .collection("customers")
    .insertOne(customer);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the customer."
      );
  }
};

const updateCustomer = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const customer = {
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
    .collection("customers")
    .replaceOne({ _id: userId }, customer);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the customer."
      );
  }
};

const deleteCustomer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid contact id");
  }
  const customerId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("customers")
    .deleteOne({ _id: customerId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the customer."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
