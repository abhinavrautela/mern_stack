const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
router
  //Create
  
  //READ
  .get("/:id", userController.getUser)
  .get("/", userController.getAllUser)
  //update
  .put("/:id", userController.replaceUser)
  .patch('/:id', userController.updateUser)
  //delete
  .delete("/:id", userController.deleteUser);


exports.usersRoute = router;
