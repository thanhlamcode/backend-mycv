const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const routesAdmin = require("./routes/admin/index.route");
const cors = require("cors");

// Kết nối cơ sở dữ liệu
database.connect();

// Khởi tạo ứng dụng Express
const app = express();
const port = process.env.PORT;

// Cấu hình middleware
app.use(bodyParser.json()); // Middleware xử lý application/json
app.use(fileUpload()); // Middleware xử lý upload file
app.use(cookieParser()); // Middleware xử lý cookie
app.use(cors()); // Middleware xử lý CORS

// Đăng ký các route cho admin
routesAdmin(app);

// Khởi động server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
