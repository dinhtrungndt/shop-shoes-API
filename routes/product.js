var express = require("express");
var router = express.Router();
var modelProduct = require("../models/product");

// lấy danh sách người dùng
// http://localhost:3000/product/get-product
router.get("/get-product", async function (req, res) {
  var Data = await modelProduct.find();
  res.json(Data);
});

// Create a new product
// http://localhost:3000/product/add-product
router.post("/add-product", async function (req, res, next) {
  try {
    const { name, kind, brand, price, color, star, content, img } = req.body;

    // tạo model
    const Data = { name, kind, brand, price, color, star, content, img };

    await modelProduct.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

module.exports = router;
