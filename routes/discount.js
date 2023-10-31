var express = require("express");
var router = express.Router();
var modelDiscount = require("../models/discount");

// lấy danh sách người dùng
// http://localhost:3000/discount/get-discount
router.get("/get-discount", async function (req, res) {
  var Data = await modelDiscount.find();
  res.json({ Data });
});

// Create a new discount
// http://localhost:3000/discount/add-discount
router.post("/add-discount", async function (req, res, next) {
  try {
    const { name, kind, brand, price, color, content, img } = req.body;

    // tạo model
    const Data = { name, kind, brand, price, color, content, img };

    await modelDiscount.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

module.exports = router;
