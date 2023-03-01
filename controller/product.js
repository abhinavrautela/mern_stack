const modle = require("../model/product");

const Product = modle.Product;
exports.getAllProduct = async (req, res) => {
  const products = Product.find();
  const pageNo = req.query.page;
  if (req.query.sort) {
    const sortedProduct = await products
      .sort({ [req.query.sort]: req.query.order })
      .skip(3 * (pageNo - 1))
      .limit(3)
      .exec();
    res.json(sortedProduct);
  } else if (req.query.page) {
    const product = await products
      .skip(3 * (pageNo - 1))
      .limit(3)
      .exec();
    res.status(201).json(product);
  } else {
    const product = await products.exec();
    res.status(201).json(product);
  }
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
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
