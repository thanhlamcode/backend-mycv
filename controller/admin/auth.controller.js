const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../../models/account.model");

const JWT_SECRET = process.env.JWT_SECRET;

// [POST] /auth/register
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
      String(JWT_SECRET), // Ép kiểu JWT_SECRET thành chuỗi
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    // Trả về token và thông tin người dùng
    return res.status(201).json({
      code: 200,
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
    const { userName, password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await Account.findOne({ userName });
    if (!existingUser) {
      return res.status(400).json({
        code: 400,
        message: "Tên người dùng không tồn tại",
      });
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        code: 400,
        message: "Mật khẩu không đúng",
      });
    }

    // Tạo JWT
    const token = jwt.sign(
      { userId: existingUser._id, userName: existingUser.userName },
      String(JWT_SECRET), // Ép kiểu JWT_SECRET thành chuỗi
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    return res.status(200).json({
      code: 200,
      message: "Đăng nhập thành công",
      token,
      user: {
        id: existingUser._id,
        userName: existingUser.userName,
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
