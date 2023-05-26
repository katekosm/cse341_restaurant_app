const validator = require("../helpers/validate");

const saveMenu = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    description: "required|string",
    price: "required|numeric",
    category: "required|string",
    availability: "required|boolean",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveOrder = async (req, res, next) => {
  const validationRule = {
    customerId: "required|numeric",
    orderDate: "required|date",
    totalPrice: "required|numeric",
    paymentMethod: "required|string",
    paymentStatus: "required|string",
    shippingAddress: "required|string",
    shippingStatus: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveUser = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    lastName: "required|string",
    nickname: "required|string",
    email: "required|email",
    yearsOfWorking: "required|numeric",
    gender: "required|numeric",
    userType: "required|numeric"
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveCustomer = async (req, res, next) => {
  const validationRule = {
    userName: "required|string",
    googleId: "required|string",
    email: "required|string"
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const updateCustomer = async (req, res, next) => {
  const validationRule = {
    userName: "required|string",
    email: "required|string"
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMenu,
  saveOrder,
  saveCustomer,
  updateCustomer,
  saveUser
};
