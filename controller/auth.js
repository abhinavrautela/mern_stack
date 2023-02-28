const { User } = require("../model/user");
const jwt = require('jsonwebtoken')

exports.createUsers = async (req, res) => {
  const newUser = new User(req.body)
  newUser.token = jwt.sign({email: req.body.email}, 'HUMMMM')
  newUser.save((err, doc)=> {
    if(err){
    res.status(500).json(err);
    } else {
      res.status(201).json(doc)
    }
  }) 
};