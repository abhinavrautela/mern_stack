const fs = require("fs");
// const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

exports.getUser = (req, res) => {
  res.json(users);
};

exports.getUsers = (req, res) => {
  const id = +req.params.id;
  const user = users.find(user => user.id === id);
  res.json(user);
};

exports.createUsers = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1);
  res.status(202).json({ req: "accapted" });
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1, { ...req.body, id });
  res.status(202).json({ req: "accapted" });
};
