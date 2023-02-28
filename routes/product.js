const express = require("express");
const {
  createProducts,
  getProduct,
  getAllProduct,
  updateProduct,
  replaceProduct,
  deleteProduct,
} = require("../controller/product");
const router = express.Router();
router
  //Create
  .post("/", createProducts)
  //READ
  .get("/:id", getProduct)
  .get("/", getAllProduct)
  //update
  .put("/:id", replaceProduct)
  .patch('/:id', updateProduct)
  //delete
  .delete("/:id", deleteProduct);

exports.productsRoute = router;
