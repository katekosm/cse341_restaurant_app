const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const createCustomer = async (req, res, next) => {
    // There's a similar function in 'customers' controller. This one
    // creates customer records when a customer logs-in for the first time
    // Creates a new record unless there's already one with the same googleId
    const customer = {
        userName: req.user.displayName,
        googleId: req.user.id,
        email: req.user.email,
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
        req.session.user = req.user;
        res.status(201).redirect("../../logged-status");
    } else {
        res
        .status(500)
        .json(
            response.error || "Some error occurred while creating the customer."
        );
    }
};

const getMyAccount = async (req, res, next) => {
    try {
      const result = await mongodb
        .getDb()
        .db()
        .collection("customers")
        .find({ googleId: req.session.user.id });
  
      result.toArray().then((customers) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(customers[0]); // Returning the logged in user's info.
      });
    } catch (error) {
      res.status(500).json(error || "Some error occurred");
    }
};

const updateMyAccount = async (req, res) => {
  // be aware of updateOne if you only want to update specific fields
  
  const response = await mongodb
    .getDb()
    .db()
    .collection("customers")
    .updateOne(
      { googleId: req.session.user.id },
      { $set: { userName: req.body.userName, email: req.body.email } }
    );
  
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

const deleteMyAccount = async (req, res) => {
  
  const response = await mongodb
    .getDb()
    .db()
    .collection("customers")
    .findOneAndDelete({ googleId: req.session.user.id });
  
  if (response) {
    res.status(200).send("Please, redirect user to /logout");
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the customer."
      );
  }
};

module.exports = {
    createCustomer,
    getMyAccount,
    updateMyAccount,
    deleteMyAccount
};