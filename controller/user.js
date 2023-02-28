const fs = require("fs");
const { User } = require("../model/user");
const jwt = require('jsonwebtoken')
// const index = fs.readFileSync("index.html", "utf-8");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const users = data.users;

exports.getAllUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id)
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndReplace({ _id: id }, req.body, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}