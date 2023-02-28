const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signUp = async (req, res) => {
  const newUser = new User(req.body);
  const hash = bcrypt.hashSync(req.body.password, 10);
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  newUser.token = token;
  newUser.password = hash;
  newUser.save((err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json({token});
    }
  });
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      let token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
    doc.token = token
    doc.save(() => {
      res.json({token})
    });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
