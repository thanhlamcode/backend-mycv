const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../../models/account.model");
const Information = require("../../models/information.model");
const Contact = require("../../models/contact.model");
const Feature = require("../../models/feature.model");
const Project = require("../../models/project.model");
const Resume = require("../../models/resume.model");

const JWT_SECRET = process.env.JWT_SECRET;

// [POST] /auth/register
module.exports.register = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Kiểm tra nếu emailAddress đã tồn tại
    const existingUser = await Account.findOne({ emailAddress });
    if (existingUser) {
      return res.status(400).json({
        code: 400,
        message: "Địa chỉ email đã tồn tại",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo các đối tượng cho các model liên quan
    const contact = new Contact({});
    const feature = new Feature({});
    const information = new Information({
      emailAddress, // Đảm bảo emailAddress được lưu
    });
    const project = new Project({});
    const resume = new Resume({});

    // Lưu từng model vào database
    await contact.save();
    await feature.save();
    await information.save();
    await project.save();
    await resume.save();

    // Tạo người dùng mới và gán các ObjectId từ các model liên quan
    const newUser = new Account({
      emailAddress,
      password: hashedPassword,
      contact: contact._id,
      feature: feature._id,
      information: information._id,
      project: project._id,
      resume: resume._id,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Cập nhật `slug` từ `newUser` vào tài liệu `Information`
    await Information.updateOne(
      { _id: information._id },
      { slug: newUser.slug }
    );

    // Tạo JWT
    const token = jwt.sign(
      { userId: newUser._id, emailAddress: newUser.emailAddress },
      JWT_SECRET, // Không cần ép kiểu thành chuỗi nếu đã được xác định
      { expiresIn: "24h" }
    );

    // Xóa password khỏi đối tượng trước khi trả về
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    // Trả về token và thông tin người dùng
    return res.status(201).json({
      code: 200,
      message: "Đăng ký thành công",
      token,
      user: userWithoutPassword,
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
    const { emailAddress, password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu
    const existingUser = await Account.findOne({ emailAddress: emailAddress });
    if (!existingUser) {
      return res.status(400).json({
        code: 400,
        message: "Email không tồn tại",
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

    // Chuyển đổi existingUser thành plain object và xóa trường password
    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password;

    // Tạo JWT
    const token = jwt.sign(
      { userId: existingUser._id, emailAddress: existingUser.emailAddress },
      String(JWT_SECRET),
      { expiresIn: "24h" } // Token hết hạn sau 1 giờ
    );

    return res.status(200).json({
      code: 200,
      message: "Đăng nhập thành công",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "Đã có lỗi xảy ra",
    });
  }
};
