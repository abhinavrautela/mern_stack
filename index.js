require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const server = express();
const mongoose = require("mongoose");
const { productsRoute } = require("./routes/product");
const { usersRoute } = require("./routes/user");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("databse connected");
}

//BOdy parser
server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(process.env.PUBLIC_DIR)));
server.use("/products", productsRoute);
server.use("/users", usersRoute);
console.log(process.env);
server.listen(process.env.PORT, () => {
  console.log("SERVER START");
});
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname , "dist", "index.html"));
});
