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

// http://localhost:3000/product/get-product?kind=women
router.get("/kind", async function (req, res, next) {
  var kind = req.query.kind;
  var data = await modelProduct.find(
    { kind: kind },
    "kind price"
  );
  res.json(data);
});

router.get('/search', (req,res) => {
	var name_search = req.query.name // lấy giá trị của key name trong query parameters gửi lên
	var age_search = req.query.age // lấy giá trị của key age trong query parameters gửi lên
	var result = modelProduct.filter( (user) => {
		// tìm kiếm chuỗi name_search trong user name. 
		// Lưu ý: Chuyển tên về cùng in thường hoặc cùng in hoa để không phân biệt hoa, thường khi tìm kiếm
		return user.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1 && user.age === parseInt(age_search)
	})

	res.render('users/index', {
		modelProduct: result // render lại trang users/index với biến users bây giờ chỉ bao gồm các kết quả phù hợp
	});
})

module.exports = router;
