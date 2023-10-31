var express = require("express");
var router = express.Router();
var modelLogin = require("../models/login");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// lấy danh sách người dùng
// http://localhost:3000/login/get-login
router.get("/get-login", async function (req, res) {
  var Data = await modelLogin.find();
  res.json({ Data });
});

// Đăng ký người dùng
// http://localhost:3000/login/add-signup

router.post("/add-signup", async function (req, res) {
  try {
    const { name, email, username, password } = req.body;

    // kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không
    const exitstingEmail = await modelLogin.findOne({ email });
    const exitstingUser = await modelLogin.findOne({ username });

    if (exitstingEmail) {
      return res.json({ status: 0, message: "Email đã tồn tại" });
    }

    if (exitstingUser) {
      return res.json({ status: 0, message: "Username đã tồn tại" });
    }

    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 12);

    // tạo model
    const Data = {
      name,
      email,
      username,
      password: hashedPassword,
      img: "",
    };

    await modelLogin.create(Data);
    res.json({ status: 1, message: "Đăng ký thành công", Data });
  } catch (error) {
    console.log(error);
    res.json({ status: 0, message: "Đăng ký thất bại", error: error.message });
  }
});

// đăng nhập người dùng
// http://localhost:3000/login/signin

router.post("/signin", async function (req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await modelLogin.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key");
    res.json({
      success: true,
      message: "Logged in successfully !",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        img: user.img,
      },
      token: token,
    });
  } catch (err) {
    res.json({ success: false, message: "Đăng nhập thất bại" });
  }
});

module.exports = router;
