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

const createDummyCustomer = async (req, res, next) => {
  // There's a similar function in 'my-account' controller. This one
  // allows admins create dummy customer records
  // Creates a new record unless there's already one with the same googleId
  const customer = {
    userName: req.body.userName,
    googleId: req.body.googleId,
    email: req.body.email,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("customers")
    .updateOne(
      { googleId: customer.googleId },
      { $setOnInsert: customer},
      { upsert: true }
    );

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
    email: req.body.email,
    userName: req.body.userName,
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
    .findOneAndDelete({ _id: customerId });
  
  if (response) {
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
  createDummyCustomer,
  updateCustomer,
  deleteCustomer,
};
