require("dotenv").config();
const fs = require('fs')
const express = require("express");
const cors = require("cors");
const path = require("path");

const server = express();
const mongoose = require("mongoose");
const { productsRoute } = require("./routes/product");
const { usersRoute } = require("./routes/user");
const jwt = require("jsonwebtoken");
const { authRouter } = require("./routes/auth");
const publicKey = fs.readFileSync(path.resolve(__dirname, 'public.key'))
//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("databse connected");
}

//BOdy parser
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    const decoded = jwt.verify(token, publicKey);
    if (decoded.email) {
      next();
    } else {
      res.send(401);
    }
  } catch (err) {
    res.send(401);
  }
};
server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(process.env.PUBLIC_DIR)));
server.use("/auth", authRouter);
server.use("/products", auth, productsRoute);
server.use("/users", auth, usersRoute);
server.listen(process.env.PORT, () => {
  console.log("SERVER START");
});
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
