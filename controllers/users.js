const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("users").find();
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
      res.status(400).json("Must be a valid user id");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error || "Some error occurred");
  }
};

const createUser = async (req, res, next) => {
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      nickname: req.body.nickname,
      email: req.body.email,
      yearsOfWorking: req.body.yearsOfWorking,
      gender: req.body.gender,
      userType: 1,
      password: hashedPassword
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the user."
        );
    }
  } catch {
    res.status(500).json(error || "Some error occurred");
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const user = {
    name: req.body.name,
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    email: req.body.email,
    yearsOfWorking: req.body.yearsOfWorking,
    gender: req.body.gender,
    userType: req.body.userType,
    password: hashedPassword
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the user."
      );
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must be a valid id");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("users")
    .deleteOne({ _id: userId }, true);

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the user."
      );
  }
};

const loginUser = async (req, res, next) => {
  const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({ email: req.body.email });
  
  result.toArray().then((lists) => {

    if (lists[0] == undefined) {
      res.status(400).send("Cannot find user");
    }
    
    (async () => {
      try {
        if( await bcrypt.compare(req.body.password, lists[0].password) ) {
          const userType = lists[0].userType;
          const userName = lists[0].name;

          const userSession = { userType: userType, displayName: userName }; 
                 
          req.session.user = userSession;
          res.status(201).redirect("/logged-status");
        } else {
          res.status(400).send("Wrong Password");
        }
      } catch {
        res.status(500).json("Some error occurred");
      }
    })()

  });  
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
