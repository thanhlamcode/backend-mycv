const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../../models/account.model"); // Giả sử bạn đã có model Account

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Kiểm tra nếu userName đã tồn tại
    const existingUser = await Account.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: "Tên người dùng đã tồn tại",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new Account({
      userName,
      password: hashedPassword,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Tạo JWT
    const token = jwt.sign(
      { userId: newUser._id, userName: newUser.userName },
      JWT_SECRET,
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    // Trả về token và thông tin người dùng
    return res.status(201).json({
      message: "Đăng ký thành công",
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "Đã có lỗi xảy ra",
    });
  }
};

// [POST] /auth/login
module.exports.login = async (req, res) => {
  try {
    console.log(req.body);

    return res.json("ok");
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};
