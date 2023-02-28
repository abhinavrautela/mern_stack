const express = require("express");
const userController = require("../controller/user");
const router = express.Router();
router
  //Create
  .post("/", userController.createUsers)
  //READ
  .get("/:id", userController.getUsers)
  .get("/", userController.getUser)
  //update
  .put("/:id", userController.updateUser)
  //delete
  .delete("/:id", userController.deleteUser);


exports.usersRoute = router;
