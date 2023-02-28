const modle = require("../model/product");

const Product = modle.Product;
exports.getAllProduct = async (req, res) => {
  const products = await Product.find(  );
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

exports.createProducts = (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(doc);
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}